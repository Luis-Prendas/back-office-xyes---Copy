import { getEnviroment } from "./getEnviroment";
import { doDelete, doGet, doPost, doPut } from "./requestHandler";
import { Seo } from "../types/seoService.type";

const normalBaseUrl = getEnviroment() + "/config";

export const getAllSeos = () => {
  return doGet<Seo[]>(`${normalBaseUrl}/api/v1/get-seos`);
};

export const createSeo = (data: any) => {
  return doPost<any>(`${normalBaseUrl}/api/v1/add-seo`, data);
};

export const updateSeo = (id: string, data: any) => {
  return doPut<any>(`${normalBaseUrl}/api/v1/update-seo/${id}`, data);
};

export const getSeoById = (id: string) => {
  return doGet<Seo>(`${normalBaseUrl}/api/v1/get-seo/${id}`);
};

export const deleteSeo = (id: string) => {
  return doDelete<any>(`${normalBaseUrl}/api/v1/delete-seo/${id}`);
};
