import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {from, Subject} from "rxjs";
import {SelectUsernameDtoWs} from "../models/select.username.dto.ws";
import {MessageWsDto} from "../models/message.ws.dto";
import {SelectReceiverDtoWs} from "../models/select.receiver.dto.ws";
import {SendMessageDtoWs} from "../models/send-message.dto.ws";
import { environment } from 'src/environments/environment.docker';


export interface Message {
  action: string;
}

@Injectable({
  providedIn: 'root'
})
export class AwsWebSocketService {
  private wsUrl = environment.AWS_WEBSOCKET_URL;
  private socket$!: WebSocketSubject<any>;
  messageSubject = new Subject<MessageWsDto>();

  public connect(): void {
    console.log('connect')
    if(!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.wsUrl);

      this.socket$.subscribe((data: MessageWsDto) => {
        console.log(data);
        this.messageSubject.next(data);
      });
    }
  }

  selectUsername(username: string) {
    const message: SelectUsernameDtoWs  = {
      action: 'selectUsername',
      username
    }
    this.socket$.next(message);
  }

  selectReceiver(receiver: string) {
    const message: SelectReceiverDtoWs = {
      action: 'selectReceiver',
      receiver
    }
    this.socket$.next(message);
  }

  sendMessage(message: string) {
    const messageToSend:SendMessageDtoWs = {
      action: 'sendMessage',
      message
    }
    this.socket$.next(messageToSend);
  }

  getMessagesObservable() {
    return this.messageSubject.asObservable();
  }

  close() {
    this.socket$.complete();
  }
}
