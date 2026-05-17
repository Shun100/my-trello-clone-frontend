import type { InternalAxiosRequestConfig } from "axios";

/**
 * WebStorageからJson Web Token (JWT)を読み出して、Authorization Headerに設定する
 * @param { InternalAxiosRequestConfig } config
 * @returns { InternalAxiosRequestConfig } config
 */
export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}