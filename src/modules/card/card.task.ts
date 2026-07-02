import type { Board } from "../board/board.entity";
import { utils } from "../utils/utils";
import type { Card } from "./card.entity";
import { cardRepository } from "./card.repository"

export const cardTask = {
  async sortWithinLane(
    board: Board,
    laneId: string,
    src: number,
    dst: number,
    setBoard: (board: Board) => void
  ) {
    const currentLanes = board.lanes;
    const targetLane = currentLanes.find(lane => lane.id === laneId);

    if (!targetLane) return;

    const currentCards = targetLane.cards;
    const resortedCards = utils.resort<Card>(currentCards, src, dst, (card) => card.position);
  
    // 画面更新
    const updatedLanes = [
      ...board.lanes.filter(lane => lane.id !== laneId),
      { ...targetLane, cards: resortedCards }
    ];
    setBoard({ ...board, lanes: updatedLanes });

    // DB更新
    try {
      await cardRepository.updatePosition(laneId, resortedCards);
    } catch (e) {
      console.error(e);
      setBoard({ ...board, lanes: currentLanes }); // 画面ロールバック
    }
  },
  

  // FIXME: to complicated
  async sortAcrossLane(
    board: Board,
    srcLaneId: string,
    srcPosition: number,
    dstLaneId: string,
    dstPosition: number,
    setBoard: (board: Board) => void
  ) {
    const currentLanes = board.lanes;
    const srcLane = currentLanes.find(lane => lane.id === srcLaneId);
    const dstLane = currentLanes.find(lane => lane.id === dstLaneId);
    const otherLanes = currentLanes.filter(lane => lane.id !== srcLaneId && lane.id !== dstLaneId);

    if (!srcLane || !dstLane) return;

    const srcCards = srcLane.cards;
    const targetCard = {
      ...srcCards.find(card => card.position === srcPosition)!,
      position: dstPosition
    };
    const srcOtherCards = srcCards
      .filter(card => card.position === srcPosition)
      .map(card => ({
        ...card,
        position: card.position > srcPosition ? card.position - 1 : card.position
      })
    );
    const dstCards = dstLane
      .cards
      .map(card => ({
        ...card,
        position: card.position >= dstPosition ? card.position + 1 : card.position
      }));
    dstCards.push(targetCard);

    srcLane.cards = srcOtherCards;
    dstLane.cards = [...dstCards, targetCard];
    
    setBoard({
      ...board,
      lanes: [...otherLanes, srcLane, dstLane]
    });
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