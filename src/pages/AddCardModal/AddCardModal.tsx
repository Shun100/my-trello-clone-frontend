import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { toastAtom } from "../../modules/toast/toast.state";
import { cardsAtom } from "../../modules/card/card.state";
import { cardTask } from "../../modules/card/card.task";
import type { Card } from "../../modules/card/card.entity";

type AddCardModalProps = {
  laneId: string,
  closeModal: () => void;
}

function AddCardModal({ laneId, closeModal }: AddCardModalProps) {
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [allCards, setCards] = useAtom(cardsAtom);
  const setShowToast = useSetAtom(toastAtom);

  const createCard = () => {
    const cards = allCards.filter(card => card.laneId === laneId);

    cardTask.create({
      params: { laneId, title, dueDate, cards },
      updateView: (newCard: Card) => setCards([...allCards, newCard]),
      onSuccess: closeModal,
      onError: () => setShowToast(true)
    });
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
            onClick={createCard}
          >
            追加
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddCardModal;