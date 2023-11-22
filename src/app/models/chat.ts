// chat.model.ts

import { Message } from './message';
import { Profile } from './profile';

export interface Chat {
  id: string;
  name?: string;
  pic?: string;
  lastMessage?: string;
  lastMessageDate?: Date;
  userIds: string[];
  users: Profile[];
  messages: Message[]; // Including messages directly in the chat model
  chatPic?: string; // For display purposes
  chatName?: string; // For display purposes
}
