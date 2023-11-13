import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chat: Chat | null = null;
  messageControl = new FormControl('');
  messages$: Observable<Message[]>;

  constructor() {
    this.messages$ = of([]);
  }

  ngOnInit(): void {
    if (this.chat) {
      this.messages$ = of(this.chat.messages);
    }
  }

  sendMessage(): void {
    if (this.messageControl.value && this.chat) {
      const newMessage: Message = {
        text: this.messageControl.value,
        senderId: 'currentUserId',
        sentDate: new Date()
      };

      this.messages$ = this.messages$.pipe(
        map((messages: Message[]) => [...messages, newMessage])
      );

      console.log('Message sent:', newMessage);
      this.messageControl.reset();
    }
  }

    isSentByCurrentUser(message: Message): boolean {
      const currentUserId = 'yourCurrentUserId';
      return message.senderId === currentUserId;
    }

}
