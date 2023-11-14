import { Injectable } from '@angular/core';
import { WknTable } from '../../models/wknTable';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WknTableService {
  private apiUrl = 'http://localhost:8081/wknTable'
  wknTableList: WknTable[] = [];

  constructor(private http: HttpClient) { }

  public getWknTableList(): Observable<WknTable[]> {
    return this.http.get<WknTable[]>(this.apiUrl);
  }




} 
