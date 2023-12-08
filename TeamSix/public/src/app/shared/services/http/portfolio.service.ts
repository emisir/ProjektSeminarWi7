import { Injectable } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortfolioItem } from '../../models/portfolioItem';
import { PortfolioDetail } from '../../models/portfolioDetail';
import { UserEntity } from '../../models/userEntity';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8081';

  portfolioList: Portfolio[] = [];

  constructor(private http: HttpClient) { }

  public getPortfolioSummary(id: number): Observable<PortfolioItem[]> {
    const urlWithId = `${this.apiUrl}/portfolio/${id}/summary`;
    return this.http.get<PortfolioItem[]>(urlWithId);
  }

  // Die Methode getDetailPortfolioList erwartet jetzt eine ID als Parameter
  public getDetailPortfolioList(id: number, wkn: string): Observable<PortfolioDetail> {
    const urlWithId = `${this.apiUrl}/portfolio/${id}/detail/${wkn}`;
    return this.http.get<PortfolioDetail>(urlWithId);
  }

  public getUserEntity(name: string): Observable<UserEntity> {
    const url = `${this.apiUrl}/portfolio/userTable/${name}`;
    return this.http.get<UserEntity>(url).pipe(
      tap((data: UserEntity) => console.log('Empfangene Daten:', data))
    );
  }




  public addPortfolioItems(id: number, formData: any): Observable<any> {
    const requestData = {
      name: formData.name,
      wkn: formData.wkn,
      description: formData.description,
      purchaseDate: formData.purchaseDate,
      category: formData.category,
      quantity: formData.quantity,
      purchasePrice: formData.purchasePrice
    };

    return this.http.post<PortfolioItem[]>(`${this.apiUrl}/portfolio/${id}/add-item`, requestData);
  }




}
