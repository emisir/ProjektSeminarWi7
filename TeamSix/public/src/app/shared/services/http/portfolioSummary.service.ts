import { Injectable } from '@angular/core';
import { PortfolioSummary } from '../../models/portfolioSummary';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PortfolioSummaryService {
  private apiUrl = 'http://localhost:8081/portfolio/1/summary'
  totalValuesList: PortfolioSummary[] = [];

  constructor(private http: HttpClient) { }

  private transformResponse(response: { [wkn: string]: any }): PortfolioSummary[] {
    return Object.keys(response).map(wkn => {
      const item = response[wkn];
      return {
        wkn: item.wkn,
        totalQuantity: item.totalQuantity,
        totalPrice: item.totalPrice,
        averagePrice: item.averagePrice
      };
    });
  }

  public getTotalValuesList(): Observable<PortfolioSummary[]> {
    return this.http.get<{ [key: string]: any }[]>(this.apiUrl).pipe(
      map(response => this.transformResponse(response))
    );
  }
}







