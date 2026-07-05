import { atom } from "jotai";
import type { Lane } from "./lane.entity";

export const lanesAtom = atom<Lane[]>([]);

/**
 * Lane削除（画面）
 * @param { string } laneId
 */
export const deleteLaneAtom = atom(
  null, // getterは持たないのでnull
  (get, set, laneId: string) => {
    const currentLanes = get(lanesAtom);
    
    const position = currentLanes
      .find(lane => lane.id === laneId)!
      .position;

    const updatedLanes = currentLanes
      .filter(lane => lane.id !== laneId)
      .map(lane => ({
        ...lane,
        position: lane.position - (lane.position > position ? 1 : 0)
      }));
    
    set(lanesAtom, updatedLanes);
  }
);