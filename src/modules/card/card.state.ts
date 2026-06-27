import { atom } from "jotai";
import type { Card } from "./card.entity";
import { atomFamily } from "jotai-family";

// export const cardAtom = atom<Map<string, Card[]>>(new Map()); // Map<laneId, Card[]>: LaneごとのCard一覧

export const cardsAtomFamily = atomFamily((key: string) =>
  atom<Card[]>([])
);

// Atom Familyを使えばkeyごとにAtomを定義できる
//
// import { atomFamily } from "jotai/utils";
// 
// const cardsByKeyAtom = atomFamily((key: string) =>
//   atom(
//     (get) => get(cardsMapAtom).get(key) ?? [],
//     (get, set, newCards: Card[]) => {
//       const map = new Map(get(cardsMapAtom));
//       map.set(key, newCards);
//       set(cardsMapAtom, map);
//     }
//   )
// );


// AtomFamilyを定義
// import { atom } from "jotai";
// import { atomFamily } from "jotai/utils";

// type Card = {
//   id: string;
//   title: string;
// };

// export const cardsFamily = atomFamily((key: string) =>
//   atom<Card[]>([])
// );

// 配列を追加
// const [, setCards] = useAtom(cardsFamily(key));

// setCards((prev) => [
//   ...prev,
//   {
//     id: crypto.randomUUID(),
//     title: "New Card",
//   },
// ]);

// 配列を更新
// setCards((prev) =>
//   prev.map((card) =>
//     card.id === targetId
//       ? { ...card, title: "Updated" }
//       : card
//   )
// );

// 配列を削除
// setCards((prev) =>
//   prev.filter((card) => card.id !== targetId)
// );