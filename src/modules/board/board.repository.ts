import api from "../../lib/api";
import { Board } from "./board.entity";

export const boardRepository = {
  /**
   * 取得
   * @param userId 
   * @returns Promise<Board> 
   */
  async fetch(userId: string): Promise<Board> {
    const result = await api.get(`/boards/${userId}`);
    const board = result.data;
    console.log(JSON.stringify(board, null, 2));
    return new Board(board);
  }
}