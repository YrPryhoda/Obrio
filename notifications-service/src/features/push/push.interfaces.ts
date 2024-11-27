interface INotification {
  title: string;
  body: string;
}

export interface IMessageData {
  to: string;
  notification: INotification;
}
