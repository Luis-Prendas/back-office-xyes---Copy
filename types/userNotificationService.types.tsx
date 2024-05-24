export type UserNotification = {
  _id: string;
  title: string;
  userId: string;
  description: string;
  extra_description: string;
  links: any[];
  image: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
}

export type ResponseInfo = {
  code: string,
  data: Notification[]
}