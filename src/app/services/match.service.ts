// match.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import {ResponseDto} from "../models/response.dto";
import { environment } from 'src/environments/environment.docker';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private baseUrl = `${environment.API_URL}/ms-chat/api/v1/match`;



  constructor(private http: HttpClient) { }

  getMatchById(matchId: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/${matchId}`);
  }

  getAllMatches(): Observable<ResponseDto<Match[]>> {
    return this.http.get<ResponseDto<Match[]>>(`${this.baseUrl}/all`);
  }
}
