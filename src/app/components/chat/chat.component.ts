// chat.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // Initialize the chats array. In a real application, you would fetch this data from a service.
  chats: Chat[] = [
    // Example chat
    {
      id: '1',
      name: 'Chat 1',
      pic: 'assets/coss.jpg',
      lastMessage: 'Hi, how are you?',
      lastMessageDate: new Date(),
      userIds: ['user1', 'user2'],
      users: [
        {
          id: 'user1',
          name: 'Alice',
          pic: 'assets/coss.jpg'
        },
        {
          id: 'user2',
          name: 'Bob',
          pic: 'assets/coss.jpg'
        }
      ],
      messages: [
        {
          text: 'Hi, how are you?',
          senderId: 'user1',
          sentDate: new Date()
        },
        // ... additional messages
      ],
      chatPic: 'assets/coss.jpg',
      chatName: 'Chat 1'
    },
    {
      id: '2',
      name: 'Chat 2',
      pic: 'assets/coss.jpg',
      lastMessage: 'Hi, how are you?',
      lastMessageDate: new Date(),
      userIds: ['user1', 'user3'],
      users: [
        {
          id: 'user1',
          name: 'Alice',
          pic: 'assets/coss.jpg'
        },
        {
          id: 'user3',
          name: 'Eve',
          pic: 'assets/coss.jpg'
        }
      ],
      messages: [
        {
          text: 'Hi, how are you?',
          senderId: 'user1',
          sentDate: new Date()
        },
        // ... additional messages
      ],
      chatPic: 'assets/coss.jpg',
      chatName: 'Chat 2'
    }
    // Add more chat objects as necessary
  ];

  @Output() chatSelected = new EventEmitter<Chat>();

  constructor() { }

  setActiveChat(chat: Chat): void {
    this.chatSelected.emit(chat); // Emit the selected chat when a chat is clicked on or otherwise activated
  }
}
