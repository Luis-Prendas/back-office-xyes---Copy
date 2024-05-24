import { getEnviroment } from "./getEnviroment";
import { Info } from "../types/infoService.type";
import { doDelete, doGet, doPost, doPut } from "./requestHandler";

const normalBaseUrl = getEnviroment() + "/config";

export const getAllInfos = () => {
  return doGet<Info[]>(`${normalBaseUrl}/api/v1/get-info`);
};

export const createInfo = (data: any) => {
  return doPost<any>(`${normalBaseUrl}/api/v1/add-info`, data);
};

export const updateInfo = (id: string, data: any) => {
  return doPut<any>(`${normalBaseUrl}/api/v1/update-info/${id}`, data);
};

export const getInfoById = (id: string) => {
  return doGet<{ message: string; info: Info }>(
    `${normalBaseUrl}/api/v1/get-info/${id}`
  );
};

export const deleteInfo = (id: string) => {
  return doDelete<any>(`${normalBaseUrl}/api/v1/delete-info/${id}`);
};
