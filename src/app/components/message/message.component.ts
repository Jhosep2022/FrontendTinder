import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chat } from 'src/app/models/chat';
import {MessageWsDto} from "../../models/message.ws.dto";
import {AwsWebSocketService} from "../../services/aws.web-socket.service";
import {AwsHttpService} from "../../services/aws-http.service";
import {KeycloakService} from "keycloak-angular";
import {Subject} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  @Input() chat: Chat | null = null;
  messageControl = new FormControl('');
  messages: MessageWsDto[] = [];

  private stop$ = new Subject<void>();
  constructor(private awsWebSocketService: AwsWebSocketService, private awsHttpService: AwsHttpService, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.awsWebSocketService.connect();
    this.awsWebSocketService.selectUsername(this.sender);
    this.awsWebSocketService.selectReceiver(this.chat!.chatName!);

    this.awsHttpService.getMessagesBySenderAndReceiver(this.sender, this.chat!.chatName!).subscribe({
      next: (response: MessageWsDto[]) => {
        console.log(response);
        this.messages = response;
        // sort messages by date
        this.messages.sort((a, b) => {
          return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
        });
        this.scrollToBottom();
      },
      error: (error) => {
        console.log(error)
      }
    });

    this.awsWebSocketService.getMessagesObservable().subscribe({
      next: (message: MessageWsDto) => {
        this.messages.push(message);
        this.scrollToBottom();
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  ngOnDestroy(): void {
    this.awsWebSocketService.close();
    this.stop$.next();
    this.stop$.complete();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch(err) {
        console.log(err);
      }
    }, 100);
  }

  sendMessage(): void {
    const message = this.messageControl.value;
    if (message) {
      this.awsWebSocketService.sendMessage(message);
      this.messageControl.setValue('');
    }
  }

  isSentByCurrentUser(message: MessageWsDto): boolean {
    return message.sender === this.sender;
  }
}
