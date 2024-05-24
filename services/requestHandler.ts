import { AxiosResponse } from "axios";
import client from "./requestConfig";

const doRequest = async <T>(
  request: () => Promise<AxiosResponse<T>>,
): Promise<SuccessResponse<T> | ErrorResponse<BaseError>> => {
  try {
    const response = await request();
    return { code: "success", data: response.data };
  } catch (e: any) {
    let errorMessage = "Unknown error";

    if (typeof e === "string") {
      errorMessage = e;
    } else if (typeof e === "object") {
      errorMessage = e?.response?.data?.message ?? e?.message ?? "Unknown error";
    }

    return {
      code: "error",
      error: { message: errorMessage },
    };
  }
};

export const doGet = async <T>(path: string) => {
  return doRequest<T>(() => client.get(path));
};

export const doPost = async <T>(path: string, body: unknown) => {
  return doRequest<T>(() => client.post(path, body));
};

export const doPut = async <T>(path: string, body: unknown) => {
  return doRequest<T>(() => client.put(path, body));
};

export const doDelete = async <T>(path: string) => {
  return doRequest<T>(() => client.delete(path));
};

export type SuccessResponse<T> = {
  code?: string;
  data?: T;
  error?: any;
};

export type ErrorResponse<E = BaseError> = {
  code: string;
  error: E;
  data?: any;
};

export type BaseError = {
  // code: string;
  message: string;
};