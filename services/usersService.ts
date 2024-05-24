import { getEnviroment } from './getEnviroment';
import { doGet, doPost, doPut } from './requestHandler';
import { User } from '../types/usersService.types';

/* const normalBaseUrl = "http://backoffice-xyes-balancer-1266949157.us-east-2.elb.amazonaws.com" */
const normalBaseUrl = getEnviroment() + '/auth';

export const getAllUsers = () => {
    return doGet<{ message: string; users: User[] }>(`${normalBaseUrl}/api/v1/usersClientGet`);
};

export const getUserById = (id: string) => {
    return doGet<{ message: string; user: User }>(`${normalBaseUrl}/api/v1/usersClient/${id}`);
};

export const updateUser = (body: User) => {
    const { _id } = body;
    console.log('body', body);
    return doPut<any>(`${normalBaseUrl}/api/v1/usersClient/${_id}`, body);
};

export const banUser = (id: string) => {
    // const ids = [];
    // ids.push(id);
    return doPut<any>(`${normalBaseUrl}/api/v1/usersClient/ban/${id}`, {});
};

export const unbanUser = (id: string) => {
    // const ids = [];
    // ids.push(id);
    return doPut<any>(`${normalBaseUrl}/api/v1/usersClient/unban/${id}`, {});
};

export const updateRemarkUser = (_id: string, remark: String) => {
    console.log('updateRemarkUser', _id, 'remark', remark);
    return doPut<any>(`${normalBaseUrl}/api/v1/usersClient/${_id}`, remark);
};
