import { getEnviroment } from './getEnviroment';
import { doPost } from './requestHandler';
import { UserNotification } from '../types/userNotificationService.types';

const normalBaseUrl = getEnviroment() + '/notifications';

export const createUserNotification = (data: UserNotification) => {
    return doPost<any>(`${normalBaseUrl}/api/v1/notification-user-activities`, data);
};
