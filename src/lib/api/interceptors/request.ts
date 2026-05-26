import type { InternalAxiosRequestConfig } from "axios";

/**
 * WebStorageからJson Web Token (JWT)を読み出して、Authorization Headerに設定する
 * @param { InternalAxiosRequestConfig } config
 * @returns { InternalAxiosRequestConfig } config
 */
export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  // 新規登録・ログイン時はJWT認証無効
  const isAuthApi =
    config.url?.includes('/auth/signup') ||
    config.url?.includes('/auth/signin');

  if (token && !isAuthApi) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}