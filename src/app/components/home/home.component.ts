// home.component.ts
import { Component } from '@angular/core';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentView: 'profile' | 'display' | 'chat' = 'display';
  activeChat: Chat | null = null;

  onViewChange(view: 'profile' | 'display' | 'chat') {
    this.currentView = view;
  }

  onChatSelected(chat: Chat) {
    this.activeChat = chat;
    this.currentView = 'chat'; // Switch to the chat view
  }
}
