import api from "../../lib/api";
import { Board } from "./board.entity";

export const boardRepository = {
  /**
   * 新規作成
   * @param userId 
   * @returns Promise<Board>
   */
  async create(userId: string): Promise<Board> {
    const result = await api.post('/board/create', { userId });
    console.table(result.data);

    return new Board(result.data);
  },

  /**
   * 取得
   * @param userId 
   * @returns Promise<Board> 
   */
  async fetch(userId: string): Promise<Board> {
    const result = await api.get(`/boards/${userId}`);
    return new Board(result.data);
  }
}