import { Timestamp } from '@angular/fire/firestore';
import { ProfileUser } from './profile-user';

export interface Chat {
  id: string;
  lastMessage?: string;
  lastMessageDate?: Date ;
  userIds: string[];
  users: ProfileUser[];

  // Not stored, only for display
  chatPic?: string;
  chatName?: string;
}

export interface Message {
  text: string;
  senderId: string;
  sentDate: Date ;
}
