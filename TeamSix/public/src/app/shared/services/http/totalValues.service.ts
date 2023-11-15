import { Injectable } from '@angular/core';
import { TotalValues } from '../../models/totalValues';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class TotalValuesService {
  private apiUrl = 'http://localhost:8081/portfolioItem/totalValues'
  totalValuesList: TotalValues[] = [];

  constructor(private http: HttpClient) { }

  private transformResponse(response: { [wkn: string]: any }): TotalValues[] {
    return Object.keys(response).map(wkn => {
      const item = response[wkn];
      return {
        wkn: wkn,
        totalQuantity: item.totalQuantity,
        totalPrice: item.totalPrice,
        averagePrice: item.averagePrice
      };
    });
  }

  public getTotalValuesList(): Observable<TotalValues[]> {
    return this.http.get<{ [key: string]: any }[]>(this.apiUrl).pipe(
      map(response => this.transformResponse(response))
    );
  }
}







