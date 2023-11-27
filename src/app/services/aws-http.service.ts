import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageWsDto} from "../models/message.ws.dto";
import { environment } from 'src/environments/environment.docker';

@Injectable({
  providedIn: 'root'
})
export class AwsHttpService {

  baseUrl: string = environment.AWS_HTTP_URL;

  constructor(private http: HttpClient) {
  }

  public getMessagesBySenderAndReceiver(sender: string, receiver: string): Observable<MessageWsDto[]> {
    return this.http.get<MessageWsDto[]>(`${this.baseUrl}/messages/${sender}/${receiver}`);
  }
}
