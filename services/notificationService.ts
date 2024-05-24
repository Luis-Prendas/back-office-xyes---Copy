import { FE_notifications_path } from "./configPaths";
import { getEnviroment } from "./getEnviroment";
import { Notification } from "../types/notificationService.types";
import { doDelete, doGet, doPost, doPut } from "./requestHandler";



export const getAllNotifications = () => {
  return doGet<{ message: string; notifications: Notification[] }>(
    `${FE_notifications_path}/get-notifications`
  );
};

export const createNotification = (data: any) => {
  return doPost<any>(`${FE_notifications_path}/add-notification`, data);
};

export const updateNotification = (id: string, data: any) => {
  return doPut<any>(`${FE_notifications_path}/update-notification/${id}`, data);
};

export const getNotificationById = (id: string) => {
  return doGet<{ message: string; notification: Notification }>(
    `${FE_notifications_path}/get-notification/${id}`
  );
};

export const deleteNotification = (id: string) => {
  return doDelete<any>(`${FE_notifications_path}/delete-notification/${id}`);
};
