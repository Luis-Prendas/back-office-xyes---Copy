import { getEnviroment } from "./getEnviroment";
import { doDelete, doGet, doPost, doPut } from "./requestHandler";
import { Vip } from "../types/vipService.type";

const normalBaseUrl = getEnviroment() + "/vips/api/v1/";

export const getAllVips = () => {
  return doGet<{ message: string; vips: Vip[] }>(`${normalBaseUrl}vip`);
};

export const createVip = (data: any) => {
  return doPost<any>(`${normalBaseUrl}vip`, data);
};

export const updateVip = (id: string, data: any) => {
  return doPut<any>(`${normalBaseUrl}vips/${id}`, data);
};

export const getVipById = (id: string) => {
  return doGet<{ message: string; vip: Vip }>(`${normalBaseUrl}vips/${id}`);
};

export const deleteVip = (id: string) => {
  return doDelete<any>(`${normalBaseUrl}vips/${id}`);
};
