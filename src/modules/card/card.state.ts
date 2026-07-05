import { atom } from "jotai";
import type { Card } from "./card.entity";

export const cardsAtom = atom<Card[]>([]);

/**
 * Card更新 (画面)
 * @param { Card } card
 */
export const updateCardAtom = atom(
  null,
  (get, set, card: Card) => {
    const current = get(cardsAtom);
    const updated = [...current.filter(c => c.id !== card.id), card];

    set(cardsAtom, updated);
  }
);

/**
 * Card削除（画面）
 * @param { string } cardId
 */
export const deleteCardAtom = atom(
  null,
  (get, set, cardId: string) => {
    const allCards = get(cardsAtom);
    const card = allCards.find(card => card.id === cardId)!;

    const updatedCards = allCards
      .filter(c => c.laneId === card.laneId && c.id !== cardId)
      .map(c => ({
        ...c,
        position: c.position > card.position
          ? c.position - 1
          : c.position
      }));

    set(cardsAtom, updatedCards);
  }
);