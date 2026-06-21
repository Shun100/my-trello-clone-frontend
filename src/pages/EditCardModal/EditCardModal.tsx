import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { constantsAtom } from '../../modules/constants/constants';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { Card } from '../../modules/card/card.entity';
import { EditableTitle } from '../Common/EditableTitle/EditableTitle';
import { cardRepository } from '../../modules/card/card.repository';
import { boardAtom } from '../../modules/board/board.state';
import { toastAtom } from '../../modules/toast/toast.state';

type EditCardModalProps = {
  laneId: string,
  card: Card,
  close: () => void,
}

export function EditCardModal({ laneId, close, card }: EditCardModalProps) {
  const [title, setTitle] = useState<string>(card.title ?? '');
  const [status, setStatus] = useState<string>(card.status ?? '');
  const [dueDate, setDueDate] = useState<string>(card.dueDate?.toISOString().slice(0, 10) ?? '');
  const [description, setDescription] = useState<string>(card.description ?? '');
  const [board, setBoard] = useAtom(boardAtom);
  const constants = useAtomValue(constantsAtom);
  const setShowToast = useSetAtom(toastAtom);

  const updateCard = async () => {
    cardRepository
      .update(card.id, title, status, dueDate, description)
      .then(close)
      .catch(err => {
        console.error(err);
        setShowToast(true);
      });
  }

  const deleteCard = async () => {
    try {
      if (board) {
        // 画面から削除
        const currentCards = board.lanes.find(lane => lane.id === laneId)!.cards
        const updatedCards = currentCards
          .filter(c => c.id !== card.id)
          .map(c => ({
          ...c,
          position: c.position > card.position
            ? c.position - 1
            : c.position
        }));

        const currentLanes = board.lanes;
        const updatedLanes = currentLanes.map(lane => lane.id === laneId ? { ...lane, cards: [...updatedCards] } : lane);

        setBoard({
          ...board,
          lanes: [...updatedLanes]
        });
      }
      

      // DBから削除
      await cardRepository.delete(card.id);
    } catch (e) {
      console.error(e);
      // TODO: 画面のロールバック処理を実装
    }
  }

  return (
    <>
      <Modal
        show={true}
        contentClassName='bg-white'
      >
        <Modal.Header>
          {/* 保存ボタン */}
          <Button variant="primary" onClick={updateCard}>
            保存
          </Button>

          <div className='ms-auto d-flex align-items-center'>
            {/* 削除ボタン */}
            <i
              className='bi bi-trash delete-button me-3'
              style={{ cursor: 'pointer'}}
              onClick={deleteCard}
            />

            {/* 閉じるボタン */}
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={close}
            />
          </div>
        </Modal.Header>

        <Modal.Body className='bg-body-secondary'>
          <div className='d-flex align-items-center gap-2'>

            {/* ステータス */}
            <select
              className='form-select bg-white w-25'
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              {
                constants?.cardStatus
                  .map(s => <option value={s} key={s}>{s} </option>)
              }
            </select>

            {/* タイトル */}
            <EditableTitle title={title} setTitle={setTitle} onBlur={e => setTitle(e.target.textContent)} />
          </div>
          
          <div className='bg-light mt-3 p-3 rounded shadow-sm'>
            <span className='me-2'>🕐</span>

            {/* 期限 */}
            <input
              type='date'
              className='rounded border border-secondary-subtle p-2'
              placeholder='期限を設定'
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>

          <div className='bg-light mt-3 p-3 rounded shadow-sm'>
            {/* 説明文 */}
            <textarea
              className='w-100 rounded border border-secondary-subtle p-2'
              placeholder='説明を入力'
              value={description}
              onChange={e => setDescription(e.target.value.trim())}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}