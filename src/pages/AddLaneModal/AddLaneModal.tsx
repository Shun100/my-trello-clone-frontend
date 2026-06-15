import { useState } from "react";
import { boardAtom } from "../../modules/board/board.state";
import { useAtom } from "jotai";
import { laneRepository } from "../../modules/lane/lane.repository";

type AddLaneModalProps = {
  closeModal: () => void;
}

function AddLaneModal({ closeModal }: AddLaneModalProps) {
  const [title, setTitle] = useState<string>('');
  const [board, setBoard] = useAtom(boardAtom);

  const addLane = async () => {
    if (board) {
      const boardId = board.id;
      const position = Math.max(...board.lanes.map(lane => lane.position)) + 1;

      const newLane = await laneRepository.create(boardId, title, position);

      // 同じオブジェクトをセットしても再レンダリングされない可能性があるため、新しくオブジェクトを作る
      setBoard({
        ...board,
        lanes: [...board.lanes, newLane],
      });
    }
  }

  return (
    <div
      className='d-flex justify-content-center align-items-center pt-4 align-self-start'
    >
      <div className="d-flex flex-column gap-2 p-3 bg-secondary-subtle border rounded">

        {/* 閉じるボタン */}
        <div className='d-flex justify-content-end'>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeModal}
          />
        </div>

        {/* タイトル */}
        <div>
          <input 
            type="text" placeholder="タイトルを入力"
            className="p-1 rounded border border-secondary-subtle"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Submitボタン */}
        <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
          <button
            className={ title !== '' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => addLane().then(closeModal)}
          >
            追加
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddLaneModal;