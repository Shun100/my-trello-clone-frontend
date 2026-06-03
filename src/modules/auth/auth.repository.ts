import api from "../../lib/api";
import { User } from "../users/user.entity";

export const authRepository = {
  /**
   * 新規ユーザ登録
   * @param { string } name 
   * @param { string } email 
   * @param { string } password 
   * @returns { Promise<{ user: User, token: string }> }
   */
  async signup(name: string, email: string, password: string): Promise<{ user: User, token: string }> {
    const result = await api.post('/auth/signup', { name, email, password });
    console.log(result);
    const { user, token } = result.data;
    return { user: new User(user), token};
  },

  /**
   * ログイン
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
    const { user } = result.data;
    if (user === null) {
      throw new Error('ユーザ情報が取得できませんでした');
    }
    return new User(user);
  },
}