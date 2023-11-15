import { Injectable } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortfolioDetailDTO } from '../../models/portfolioDetailDTO';
import { PortfolioSummary } from '../../models/portfolioSummary';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8081/portfolio';
  portfolioList: Portfolio[] = [];
  public portfolioDetail: PortfolioDetailDTO[] = [];

  constructor(private http: HttpClient) { }

  public getPortfolioList(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.apiUrl);
  }

  // Die Methode getDetailPortfolioList erwartet jetzt eine ID als Parameter
  public getDetailPortfolioList(id: number): Observable<PortfolioDetailDTO> {
    const urlWithId = `${this.apiUrl}/${id}`;
    return this.http.get<PortfolioDetailDTO>(urlWithId);
  }
  public getPortfolioSummary(id: number): Observable<PortfolioSummary[]> {
    const urlWithId = `${this.apiUrl}/${id}/summary`;
    return this.http.get<PortfolioSummary[]>(urlWithId);
  }
}
