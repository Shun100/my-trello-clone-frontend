import type { Board } from "../board/board.entity";
import { utils } from "../utils/utils";
import type { Lane } from "./lane.entity";
import { laneRepository } from "./lane.repository";

export const laneTask = {
  /**
   * タイトル更新 (DB + 画面)
   * @param lane 
   * @param title 
   * @param setTitleState 
   */
  updateTitle(
    lane: Lane,
    title: string,
    setTitleState: (title: string) => void,
    onError: () => void
  ) {
    // DB更新
    laneRepository.update([{ ...lane, title }])
      .then(() => setTitleState(title))
      .catch(e => {
        console.error(e);
        onError();
      });
  },

  /**
   * 並び順更新 (DB + 画面)
   * @param board 
   * @param src 
   * @param dst 
   * @param updatePositionAtom 
   */
  updatePosition(args: {
    params: { lanes: Lane[], src: number, dst: number },
    updateView: (lanes: Lane[]) => void,
    onSuccess?: () => void,
    onError?: () => void
  }) {
    const updatedLanes = utils.resort<Lane>(
      args.params.lanes,
      args.params.src,
      args.params.dst,
      lane => lane.position
    );

    args.updateView(updatedLanes); // 先に画面更新

    laneRepository.update([...updatedLanes]) // 次にDB更新
      .then(args.onSuccess)
      .catch(e => {
        console.error(e);
        args.updateView(args.params.lanes); // 更新失敗時は画面ロールバック
        args.onError?.();
      });
  },

  /**
   * 削除 (DB + 画面)
   * @param board 
   * @param laneId 
   * @param deleteAtom 
   */
  delete(
    laneId: string,
    deleteAtom: (laneId: string) => void,
    onError: () => void
  ) {
    laneRepository.delete(laneId)
      .then(() => deleteAtom(laneId))
      .catch(e => {
        console.error(e);
        onError();
      });
  },
}