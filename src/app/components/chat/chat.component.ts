import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Message } from 'src/app/models/chat';
import { ProfileUser } from 'src/app/models/profile-user';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users$: Observable<ProfileUser[]>;
  myChats$: Observable<any[]>;
  selectedChat$: Observable<any>;
  messages$: Observable<Message[]>;
  user$: Observable<ProfileUser>;
  searchControl = new FormControl();
  chatListControl = new FormControl();
  messageControl = new FormControl();

  constructor() {
    // Datos mock de usuarios
    this.users$ = of([
      { uid: '1', displayName: 'Juan' },
      { uid: '2', displayName: 'Maria' },
      { uid: '3', displayName: 'Carlos' },
    ]);

    // Datos mock de chats
    this.myChats$ = of([
      { id: 'chat1', chatName: 'Chat con Juan', chatPic: '', lastMessage: 'Hola, ¿cómo estás?', lastMessageDate: new Date() },
      { id: 'chat2', chatName: 'Chat con Maria', chatPic: '', lastMessage: 'Nos vemos mañana', lastMessageDate: new Date() },
    ]);

    // Datos mock de chat seleccionado
    this.selectedChat$ = of({ id: 'chat1', chatName: 'Chat con Juan', chatPic: '', lastMessage: 'Hola, ¿cómo estás?', lastMessageDate: new Date() });

    // Datos mock de mensajes
    this.messages$ = of([
      { text: 'Hola, ¿cómo estás?', sentDate: new Date(), senderId: '1' },
      { text: 'Bien, gracias', sentDate: new Date(), senderId: '2' },
    ]);

    // Datos mock de usuario actual
    this.user$ = of({ uid: '2', displayName: 'Maria' });
  }

  ngOnInit() {}
}
