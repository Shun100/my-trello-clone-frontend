import { atom } from "jotai";
import { boardAtom } from "../board/board.state";

/**
 * Lane position更新（画面）
 * @param { number } srcPosition: 移動前の位置
 * @param { number } dstPosition: 移動後の位置
 */
export const updateLanePositionAtom = atom(
  null, // getterは持たないのでnull
  (get, set, srcPosition: number, dstPosition: number) => {
    const board = get(boardAtom);
    if (!board) return;

    const updatedLanes = [...board.lanes];

    /**
     * 並び替え
     * Usage: array.splice(start, deleteCount, itemToAdd1, itemToAdd2, ...)
     */
    const [moved] = updatedLanes.splice(srcPosition, 1);
    updatedLanes.splice(dstPosition, 0, moved);
    updatedLanes.forEach((lane, index) => lane.position = index);

    set(boardAtom, {
      ...board,
      lanes: updatedLanes
    });
  }
);

/**
 * Lane削除（画面）
 * @param { string } deleteTargetLaneId
 */
export const deleteLaneAtom = atom(
  null, // getterは持たないのでnull
  (get, set, deleteTargetLaneId: string) => {
    const board = get(boardAtom);
    if (!board) return; // Boardが存在しなければ終了

    const currentLanes = board.lanes;
    const deleteTargetLane = board.lanes.find(lane => lane.id === deleteTargetLaneId);

    if (!deleteTargetLane) return; // 削除対象のLaneが存在しなければ終了

    const updatedLanes = currentLanes
      .filter(l => l.id !== deleteTargetLaneId)
      .map(l => ({
        ...l,
        position: l.position > deleteTargetLane.position
          ? l.position - 1
          : l.position
      }));
    
    set(boardAtom, {
      ...board,
      lanes: updatedLanes,
    });
  }
);