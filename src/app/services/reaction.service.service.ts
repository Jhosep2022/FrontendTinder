// reaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reaction } from '../models/reaction'; // Asegúrate de que la ruta de importación sea correcta
import { environment } from 'src/environments/environment.docker';


@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = `${environment.API_URL}/ms-chat/api/v1/reaction`;

  constructor(private http: HttpClient) { }

  postReaction(emitterId: number, catcherId: number, islike: boolean): Observable<Reaction> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer your-auth-token', // Reemplaza con el token real
      'Content-Type': 'application/json'
    });

    const body = {
      emitterId,
      catcherId,
      islike
    };

    return this.http.post<Reaction>(this.baseUrl, body, { headers });  //
  }
}
