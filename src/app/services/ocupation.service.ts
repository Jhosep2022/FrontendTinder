// occupation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Occupation } from '../models/Ocupation';
import { environment } from 'src/environments/environment.docker';

export interface ApiResponse {
  code: number;
  data: Occupation[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  private baseUrl = `${environment.API_URL}/ms-profile/api/v1/ocupation`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createOccupation(occupation: Occupation): Observable<Occupation> {
    // Construye el objeto con la propiedad ocupationName para que coincida con la propiedad esperada en el backend
    const payload = {
      ocupationName: occupation.occupationName
    };
    console.log('Sending this data to server', payload);
    return this.http.post<Occupation>(`${this.baseUrl}/create`, payload, { headers: this.getAuthHeaders() });
  }

  getAllOccupations(page: number = 1, pageSize: number = 10): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  getOccupationById(occupationId: number): Observable<Occupation> {
    return this.http.get<Occupation>(`${this.baseUrl}/${occupationId}`, { headers: this.getAuthHeaders() });
  }
}
