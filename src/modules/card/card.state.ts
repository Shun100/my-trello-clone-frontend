import { atom } from "jotai";
import { boardAtom } from "../board/board.state";

/**
 * Card削除（画面）
 * @param { string } laneId
 * @param { string } targetCardId
 */
export const deleteCardAtom = atom(
  null,
  (get, set, laneId: string, targetCardId: string) => {
    const board = get(boardAtom);
    if (!board) return;

    const lane = board
      .lanes
      .find(lane => lane.id === laneId);
    if (!lane) return;

    const targetCard = lane
      .cards
      .find(card => card.id === targetCardId);
    if (!targetCard) return;

    const updatedCards = lane
      .cards
      .filter(card => card.id !== targetCardId)
      .map(card => ({
      ...card,
      position: card.position > targetCard.position
        ? card.position - 1
        : card.position
    }));

    const updatedLanes = board.lanes
      .map(lane => lane.id === laneId ? { ...lane, cards: [...updatedCards] } : lane);

    set(boardAtom, {
      ...board,
      lanes: [...updatedLanes]
    });
  }
);