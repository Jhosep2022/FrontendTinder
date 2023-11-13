// chat.model.ts
import { ProfileUser } from './profile-user';
import { Message } from './message';

export interface Chat {
  id: string;
  name?: string;
  pic?: string;
  lastMessage?: string;
  lastMessageDate?: Date;
  userIds: string[];
  users: ProfileUser[];
  messages: Message[]; // Including messages directly in the chat model
  chatPic?: string; // For display purposes
  chatName?: string; // For display purposes
}
