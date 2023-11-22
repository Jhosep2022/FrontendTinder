export class Notification {
  notificationId: number;
  type: string;
  matchId: number;
  messageId: number;

  constructor(notificationId: number, type: string, matchId: number, messageId: number) {
      this.notificationId = notificationId;
      this.type = type;
      this.matchId = matchId;
      this.messageId = messageId;
  }
}
