import { Injectable } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortfolioDetailDTO } from '../../models/portfolioDetailDTO';
import { PortfolioSummary } from '../../models/portfolioSummary';
import { PortfolioItem } from '../../models/portfolioItem';


@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8081';

  portfolioList: Portfolio[] = [];
  public portfolioDetail: PortfolioDetailDTO[] = [];

  constructor(private http: HttpClient) { }

  public getPortfolioList(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.apiUrl}/portfolio`);
  }

  // Die Methode getDetailPortfolioList erwartet jetzt eine ID als Parameter
  public getDetailPortfolioList(id: number): Observable<PortfolioDetailDTO> {
    const urlWithId = `${this.apiUrl}/portfolio/${id}`;
    return this.http.get<PortfolioDetailDTO>(urlWithId);
  }

  public getPortfolioSummary(id: number, wkn: string): Observable<PortfolioSummary> {
    const urlWithId = `${this.apiUrl}/portfolio/${id}/summary/${wkn}`;
    return this.http.get<PortfolioSummary>(urlWithId);
  }

  public getPortfolioItemList(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/portfolioItem`);
  }


}
