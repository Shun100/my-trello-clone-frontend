import { useState } from "react";
import { boardAtom } from "../../modules/board/board.state";
import { useAtom } from "jotai";
import { cardRepository } from "../../modules/card/card.repository";

type AddCardModalProps = {
  laneId: string,
  closeModal: () => void;
}

function AddCardModal({ laneId, closeModal }: AddCardModalProps) {
  const [title, setTitle] = useState<string>('');
  const [board, setBoard] = useAtom(boardAtom);

  const createCard = async() => {
    if (board) {
      const cards = board.lanes
        .find(lane => lane.id === laneId)!
        .cards;

      const position = cards.length > 0
        ? cards.map(card => card.position).reduce((a, b) => Math.max(a, b)) + 1
        : 0;

      const newCard = await cardRepository.create(title, laneId, position);

      board.lanes.forEach(lane => {
        if (lane.id === laneId) {
          lane.cards.push(newCard);
        }
      });

      setBoard(board);
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
            onClick={() => createCard().then(closeModal)}
          >
            カードを追加
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

export default AddCardModal;