import { Injectable } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortfolioItem } from '../../models/portfolioItem';
import { PortfolioDetail } from '../../models/portfolioDetail';
import { UserEntity } from '../../models/userEntity';
import { AuthCoreService } from '../../auth-core/auth-core.service';



@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8081';

  portfolioList: Portfolio[] = [];


  constructor(private http: HttpClient, private authService: AuthCoreService) { }

  public getPortfolioSummary(id: number): Observable<PortfolioItem[]> {
    const urlWithId = `${this.apiUrl}/portfolio/${id}/summary`;
    return this.http.get<PortfolioItem[]>(urlWithId);
  }

  // Die Methode getDetailPortfolioList erwartet jetzt eine ID als Parameter
  public getDetailPortfolioList(id: number, wkn: string): Observable<PortfolioDetail> {
    const urlWithId = `${this.apiUrl}/portfolio/${id}/detail/${wkn}`;
    return this.http.get<PortfolioDetail>(urlWithId);
  }
  public getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public addPortfolioItems(id: number, formData: any): Observable<any> {
    const requestData = {
      name: formData.name,
      wkn: formData.wkn,
      description: formData.description,
      purchaseDate: this.getCurrentDate(),
      category: formData.category,
      quantity: formData.quantity,
      purchasePrice: formData.purchasePrice
    };

    return this.http.post<PortfolioItem[]>(`${this.apiUrl}/portfolio/${id}/add-item`, requestData, { headers: this.getAuthHeaders() });
  }

  public getUserEntity(): Observable<UserEntity[]> {
    const url = `${this.apiUrl}/portfolio/userTable`;
    return this.http.get<UserEntity[]>(url)
  }

  public addNewUserEntity(formData: any): Observable<any> {
    const requestData = {
      name: formData.name,
      username: formData.username,
      password: formData.password,
      role: formData.role,
    }
    return this.http.post<UserEntity>(`${this.apiUrl}/portfolio/add-user`, requestData, { headers: this.getAuthHeaders() });
  }

  public deleteUserEntity(username: string): Observable<any> {
    const urlWithUsername = `${this.apiUrl}/portfolio/delete-user/${username}`;
    return this.http.delete<any>(urlWithUsername);
  }


  public updateUserEntity(username: string, formData: any): Observable<any> {
    const requestData = {
      name: formData.name,
      password: formData.password,
      role: formData.role,
    };
    return this.http.put<UserEntity>(`${this.apiUrl}/portfolio/update-user/${username}`, requestData, { headers: this.getAuthHeaders() });
  }

  public getCurrentUser(): Observable<string> {
    const urlWithCurrentUser = `${this.apiUrl}/login`;
    return this.http.get<string>(urlWithCurrentUser);
  }

  public buyItem(id: number, formData: any): Observable<any> {
    const requestData = {
      name: formData.name,
      wkn: formData.wkn,
      description: formData.description,
      purchaseDate: this.getCurrentDate(),
      category: formData.category,
      quantity: formData.quantity,
      purchasePrice: formData.purchasePrice
    };

    return this.http.post<PortfolioItem[]>(`${this.apiUrl}/portfolio/${id}/buy-item`, requestData, { headers: this.getAuthHeaders() });
  }


  private getAuthHeaders(): any {
    return {
      "Authorization": "Basic " + this.authService.getToken()
    }
  }






}
