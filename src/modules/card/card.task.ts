import type { Board } from "../board/board.entity";
import { utils } from "../utils/utils";
import type { Card } from "./card.entity";
import { cardRepository } from "./card.repository"

export const cardTask = {
  async sortWithinLane(
    board: Board | undefined,
    laneId: string,
    src: number,
    dst: number,
    setBoard: (board: Board) => void
  ) {
    const lane = board?.lanes.find(l => l.id === laneId);

    if (!board || !lane) return;

    const currentCards = lane.cards;
    const resortedCards = utils.resort<Card>(currentCards, src, dst, (card) => card.position);
  
    // 画面更新
    const updatedLanes = [
      ...board.lanes.filter(lane => lane.id !== laneId),
      { ...lane, cards: resortedCards }
    ];
    setBoard({ ...board, lanes: updatedLanes });

    // DB更新
    await cardRepository.updatePosition(laneId, resortedCards);

    // TODO: 更新失敗時にロールバックする
  },
  
  async sortAcrossLane() {
    // TODO: 処理実装
  },

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