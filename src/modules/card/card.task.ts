import type { Board } from "../board/board.entity";
import { utils } from "../utils/utils";
import { Card } from "./card.entity";
import { cardRepository } from "./card.repository"

export const cardTask = {
  // Card作成 (画面 + DB)
  create (args: {
    params: { laneId: string, title: string, dueDate: string, cards: Card[]};
    updateView: (newCard: Card) => void;
    onSuccess: () => void;
    onError: () => void;
  }) {
    const position = Math.max(-1, ...args.params.cards.map(card => card.position)) + 1;

    cardRepository
      .create(
        args.params.title,
        args.params.laneId,
        position,
        new Date(args.params.dueDate)
      )
      .then(newCard => {
        args.updateView(newCard);
        args.onSuccess();
      })
      .catch(e => {
        console.error(e);
        args.onError();
      });
  },

  // Card更新 (画面 + DB)
  update (args: {
    params: { card: Card },
    updateView: (updatedCard: Card) => void,
    onSuccess?: () => void,
    onError?: () => void
  }) {
    cardRepository
      .update(args.params.card)
      .then(() => {
        args.updateView(args.params.card);
        args.onSuccess?.();
      })
      .catch(e => {
        console.error(e);
        args.onError?.();
      });
  },

  // Lane内 Card並び替え (画面 + DB)
  sortWithinLane(args: {
    params: { cards: Card[], laneId: string, srcPosition: number, dstPosition: number }
    updateView: (cards: Card[]) => void,
    onSuccess?: () => void,
    onError?: () => void
  }) {
    const current = args.params.cards
      .filter(card => card.laneId === args.params.laneId);
    const others = args.params.cards
      .filter(card => card.laneId !== args.params.laneId);

    const resorted = utils.resort<Card>(
      current,
      args.params.srcPosition,
      args.params.dstPosition,
      (card) => card.position
    );
  
    // 先に画面更新
    args.updateView([...others, ...resorted]);

    // 次にDB更新
    cardRepository.updatePosition(resorted.map(card => ({
      cardId: card.id,
      laneId: card.laneId,
      position: card.position
    })))
      .then(args.onSuccess)
      .catch(e => {
        console.error(e);
        args.updateView([...others, ...current]); // 更新失敗時は画面ロールバック
        args.onError?.();
      });
  },

  // Lane間 Card並び替え (画面 + DB)
  sortAcrossLane(args: {
    params: {
      cards: Card[],
      srcLaneId: string,
      dstLaneId: string,
      srcPosition: number,
      dstPosition: number
    },
    updateView: (cards: Card[]) => void,
    onSuccess?: () => void,
    onError?: () => void
  }) {

    const current: { src: Card[]; dst: Card[]; } = {
      src: [],
      dst: [],
    };
    const others: Card[] = [];

    for (const card of args.params.cards) {
      if (card.laneId === args.params.srcLaneId) current.src.push(card);
      else if (card.laneId === args.params.dstLaneId) current.dst.push(card);
      else others.push(card);
    }

    const updated: { src: Card[]; dst: Card[]; } = {
      src: current.src
        .filter(card => card.position !== args.params.srcPosition)
        .map(card => ({
          ...card,
          position: card.position > args.params.srcPosition ? card.position - 1 : card.position
        })),
      dst: [
        new Card({
          ...current.src.find(card => card.position === args.params.srcPosition)!,
          laneId: args.params.dstLaneId,
          position: args.params.dstPosition
        }),
        ...current.dst
          .map(card => ({
            ...card,
            position: card.position >= args.params.dstPosition ? card.position + 1 : card.position
          }))
      ]
    };

    // 先に画面更新
    args.updateView([...updated.src, ...updated.dst, ...others]);

    // 次にDB更新
    cardRepository
      .updatePosition([
        ...updated.src.map(card => ({
          cardId: card.id,
          laneId: card.laneId,
          position: card.position
        })),
        ...updated.dst.map(card => ({
          cardId: card.id,
          laneId: card.laneId,
          position: card.position
        }))
      ])
      .then(args.onSuccess)
      .catch(e => {
        console.error(e);
        args.updateView([...current.src, ...current.dst, ...others]); // 更新失敗時は画面ロールバック
        args.onError?.();
      });
  },

  // Card削除 (画面 + DB)
  async delete(args: {
    params: { cardId: string };
    updateView: (cardId: string) => void;
    onSuccess?: () => void;
    onError?: () => void;
  }
  ) {
    cardRepository.delete(args.params.cardId)
      .then(() => {
        args.updateView(args.params.cardId);
        args.onSuccess?.();
      })
      .catch(e => {
        console.error(e);
        args.onError?.();
      });
  }
}