import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Occupation } from '../models/Ocupation';


@Injectable({
  providedIn: 'root'
})
export class OcupationService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  createOccupation(occupation: Occupation): Observable<any> {
    return this.http.post(`${this.baseUrl}/ms-profile/api/v1/ocupation/create`, occupation);
  }

  getAllOccupations(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(`${this.baseUrl}/ms-chat/api/v1/chat/all`);
  }
}
