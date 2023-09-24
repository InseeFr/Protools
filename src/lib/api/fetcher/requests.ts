/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import fetcher from './fetcher';
import { ConfigContext } from '../../../App';


const { apiUrl } = useContext(ConfigContext);

export const getRequest = (url: string, token: string) => fetcher(`${apiUrl}${url}`, 'GET', token, null);

export const postRequest = (url: string, token:string, body: any) =>
  fetcher(`${apiUrl}${url}`, 'POST',token, body);

export const putRequest = (url: string, token:string, body: any) => fetcher(`${apiUrl}${url}`, 'PUT',token, body);

export const deleteRequest = (url: string, token:string) => fetcher(`${apiUrl}${url}`, 'DELETE', token, null);