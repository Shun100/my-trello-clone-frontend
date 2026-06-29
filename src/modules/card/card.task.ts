import type { Board } from "../board/board.entity";
import { cardRepository } from "./card.repository"

export const cardTask = {
  async sortWithinLane(
    board: Board | undefined,
    laneId: string,
    src: number,
    dst: number
  ) {
    if (!board) return;

    const lane = board
      .lanes
      .find(l => l.id === laneId);
    
    // TODO: laneの中のsrc番目をdst番目に移動する

  },
  
  async sortAcrossLane() {},

  /**
   * カード削除
   * @param { string } laneId
   * @param { string } cardId
   * @param { (laneId: string, cardId: string) => void } deleteAtom
   */
  async delete(
    laneId: string,
    cardId: string,
    deleteAtom: (laneId: string, cardId: string) => void
  ) {
    await cardRepository.delete(cardId); // DBから削除
    deleteAtom(laneId, cardId); // 画面から削除
  }
}