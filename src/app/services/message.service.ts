// message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = `${environment.API_URL}/ms-chat/api/v1/message`;

  constructor(private http: HttpClient) { }

  // getAuthHeaders(): HttpHeaders {
  //   const token = 'your-auth-token';
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // }

  postMessage(profileId: number, chatId: number, content: string): Observable<Message> {
    const body = {
      profile: profileId,
      chat: {
        chatId: chatId
      },
      content: content,
      timeMessage: new Date().toISOString() // Genera el timestamp actual
    };
    return this.http.post<Message>(this.baseUrl, body);
  }

  // Método para actualizar un mensaje existente
  updateMessage(messageId: number, content: string): Observable<any> {
    const body = {
      content: content
    };
    return this.http.put(`${this.baseUrl}/${messageId}`, body);
  }


  getMessageById(messageId: number): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/${messageId}`);
  }


  getMessagesByProfile(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${chatId}/profile`);
  }


  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${messageId}`);
  }
}
