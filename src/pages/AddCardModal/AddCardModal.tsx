import { useState } from "react";
import { boardAtom } from "../../modules/board/board.state";
import { useAtom, useSetAtom } from "jotai";
import { cardRepository } from "../../modules/card/card.repository";
import { toastAtom } from "../../modules/toast/toast.state";

type AddCardModalProps = {
  laneId: string,
  closeModal: () => void;
}

function AddCardModal({ laneId, closeModal }: AddCardModalProps) {
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [board, setBoard] = useAtom(boardAtom);
  const setShowToast = useSetAtom(toastAtom);

  const createCard = async() => {
    if (!board) {
      console.error('board not exits');
      setShowToast(true);
      return;
    }

    const cards = board.lanes
      .find(lane => lane.id === laneId)!
      .cards;

    const position = cards.length > 0
      ? cards.map(card => card.position).reduce((a, b) => Math.max(a, b)) + 1
      : 0;

    try {
      const newCard = await cardRepository.create(title, laneId, position, new Date(dueDate));

      board.lanes.forEach(lane => {
        if (lane.id === laneId) {
          lane.cards.push(newCard);
        }
      });
    } catch (e) {
      console.error(e);
      setShowToast(true);
      return;
    }
    
    // 画面更新
    setBoard(board);
  }

  return (
    <div
      className='d-flex justify-content-center align-items-center pt-4'
    >
      <div className="d-flex flex-column gap-2 p-3 bg-secondary-subtle border rounded">

        {/* 閉じるボタン */}
        <div className="d-flex justify-content-end">
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

        {/* 期限 */}
        <div className='bg-light p-3 rounded shadow-sm'>
          <span className='me-2'>🕐</span>
          <input
            type='date'
            className='rounded border border-secondary-subtle p-2'
            placeholder='期限を設定'
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
      
        {/* Submitボタン */}
        <div className="d-flex align-items-center justify-content-end gap-2 mt-2">
          <button
            className={ title !== '' && dueDate !== '' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => createCard().then(closeModal)}
          >
            追加
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddCardModal;