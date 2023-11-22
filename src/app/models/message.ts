export class Message {
  messageId: number;
  profileId: number;
  chatId: number;
  content: string;
  timeMessage: Date;

  constructor(messageId: number, profileId: number, chatId: number, content: string, timeMessage: Date) {
      this.messageId = messageId;
      this.profileId = profileId;
      this.chatId = chatId;
      this.content = content;
      this.timeMessage = timeMessage;
  }
}

