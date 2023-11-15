import { Injectable } from '@angular/core';
import { PortfolioItem } from '../../models/./portfolioItem';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioItemService {
  private apiUrl = 'http://localhost:8081/portfolioItem'
  portfolioItemList: PortfolioItem[] = [];

  constructor(private http: HttpClient) { }

  public getPortfolioItemList(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(this.apiUrl);
  }




}
