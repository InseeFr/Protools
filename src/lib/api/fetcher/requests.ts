import { fetcher, fetcherMultipart } from "./fetcher";

export const getRequest = (url: string, token: string, body?: any) => {
  return fetcher(`${url}`, "GET", token, body ? body : null);
};

export const postRequest = (url: string, token: string, body: any) =>
  fetcher(`${url}`, "POST", token, body);

export const postMultiPartRequest = (url: string, token: string, body: any) =>
  fetcherMultipart(`${url}`, "POST", token, body);

export const putRequest = (url: string, token: string, body: any) =>
  fetcher(`${url}`, "PUT", token, body);

export const deleteRequest = (url: string, token: string) =>
  fetcher(`${url}`, "DELETE", token, null);
