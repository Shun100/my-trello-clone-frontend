import type { Board } from "../board/board.entity";
import type { Lane } from "./lane.entity";
import { laneRepository } from "./lane.repository";

export const laneTask = {
  /**
   * タイトル更新 (DB + 画面)
   * @param lane 
   * @param title 
   * @param setTitleState 
   */
  async updateTitle(
    lane: Lane,
    title: string,
    setTitleState: (title: string) => void
  ) {
    // DB更新
    await laneRepository.update([{
      id: lane.id,
      title,
      position: lane.position
    }]);

    setTitleState(title); // 画面更新
  },

  /**
   * 並び順更新 (DB + 画面)
   * @param board 
   * @param src 
   * @param dst 
   * @param updatePositionAtom 
   */
  async updatePosition(
    board: Board | undefined,
    src: number,
    dst: number | undefined,
    updatePositionAtom: (src: number, dst: number) => void
  ) {
    if (!board) throw new Error('board is undefined');
    if (!dst) throw new Error('invalid destination');

    await laneRepository.update([...board.lanes]); // DB更新
    updatePositionAtom(src, dst); // 画面更新
  },

  /**
   * 削除 (DB + 画面)
   * @param board 
   * @param laneId 
   * @param deleteAtom 
   */
  async delete(
    board: Board | undefined,
    laneId: string,
    deleteAtom: (laneId: string) => void
  ) {
    if (!board) throw new Error('board does not exist');

    await laneRepository.delete(laneId); // DBから削除
    deleteAtom(laneId); // 画面から削除
  },
}