// menu-lateral.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  view: 'Match' | 'Chat' = 'Match';
  @Output() profileSelected = new EventEmitter<'profile' | 'display'>();
  @Output() chatSelected = new EventEmitter<Chat>(); // Emit the selected chat to the parent component

  constructor(private router: Router) {}

  goToProfile() {
    this.profileSelected.emit('profile');
  }

  onChatSelected(chat: Chat) {
    this.chatSelected.emit(chat); // Emit the event to the parent component
  }
}
