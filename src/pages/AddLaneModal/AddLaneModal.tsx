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
      className='d-flex justify-content-center align-items-center pt-4'
      style={{ height: "150px", width: "250px" }}
    >
      <div className="p-4 bg-secondary-subtle border rounded">
        <input 
          type="text" placeholder="タイトルを入力"
          className="p-1 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="mt-2 d-flex align-items-center gap-2">
          <button
            className={ title !== '' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => addLane().then(closeModal)}
          >
            レーンを追加
          </button>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLaneModal;