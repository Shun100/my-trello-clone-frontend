import axios from "axios";
import api from "../../lib/api";
import { User } from "../users/user.entity";
import { InvalidFormError, UserAlreadyExistsError } from "../../errors/errors";

export const authRepository = {
  /**
   * サインアップ
   * <p>
   *  内部ではaxiosを使っており、axiosはデフォルトで
   *    - 2xx -> 成功
   *    - 3xx ~ 5xx -> Promise reject
   *  という動作をする
   * </p>
   * @param { string } name 
   * @param { string } email 
   * @param { string } password 
   * @returns { Promise<{ user: User, token: string }> }
   */
  async signup(name: string, email: string, password: string): Promise<{ user: User, token: string }> {
    try {
      const result = await api.post('/auth/signup', { name, email, password });
      console.log(result);
      const { user, token } = result.data;
      return { user: new User(user), token};

    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new UserAlreadyExistsError(err);
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        const message = err.response?.data?.errors?.[0]?.defaultMessage;
        throw new InvalidFormError(message, err);
      } else {
        throw err;
      }
    }
  },

  /**
   * サインイン
   * <p>
   *  内部ではaxiosを使っており、axiosはデフォルトで
   *    - 2xx -> 成功
   *    - 3xx ~ 5xx -> Promise reject
   *  という動作をする
   * </p>
   * @param { string } email 
   * @param { string } password 
   * @returns { Promise<{ user: User, token: string }> }
   */
  async signin(email: string, password: string): Promise<{ user: User, token: string }> {
    const result = await api.post('/auth/signin', { email, password });
    const { user, token } = result.data;
    return { user: new User(user), token };
  },

  /**
   * 現在のユーザ情報取得
   * @returns { Promise<User> }
   * @throws Error - ユーザ情報取得失敗
   */
  async getCurrentUser(): Promise<User> {
    const result = await api.get('/auth/me');
    const user = result.data;
    console.table(user);
    if (user === null) {
      throw new Error('ユーザ情報が取得できませんでした');
    }
    return new User(user);
  },
}