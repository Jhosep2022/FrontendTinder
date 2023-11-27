// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = `${environment.API_URL}/ms-chat/api/v1/chat`;

  constructor(private http: HttpClient) { }

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.baseUrl}/all`);
  }

  getChatById(id: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/${id}`);
  }

  postChat(matchId: number): Observable<Chat> {
    return this.http.post<Chat>(this.baseUrl, { matchId });
  }
}
