import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { constantsAtom } from '../../modules/constants/constants';
import { useAtomValue } from 'jotai';
import type { Card } from '../../modules/card/card.entity';

type EditCardModalProps = {
  card: Card,
  close: () => void,
}

export function EditCardModal({ close, card }: EditCardModalProps) {
  const [title, setTitle] = useState<string>(card.title);
  const [status, setStatus] = useState<string>(card.status);
  const constants = useAtomValue(constantsAtom);

  return (
    <>
      <Modal
        show={true}
        contentClassName='bg-white'
      >
        <Modal.Header>
          <Button variant="primary">
            保存
          </Button>
          <div className='ms-auto d-flex align-items-center'>
            <i
              className='bi bi-trash delete-button me-3'
              style={{ cursor: 'pointer'}}
            />
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
            <h4 className='mb-0'>{title}</h4>
          </div>
          
          <div className='bg-light mt-3 p-3 rounded shadow-sm'>
            <p>🕐 期限を設定してください</p>
            <input
              type='date'
              className='rounded border border-secondary-subtle p-2'
              placeholder='期限を設定'
            />
          </div>
          <div
            className='bg-light mt-3 p-3 rounded shadow-sm'>
            <p>説明</p>
            <textarea className='w-100 rounded border border-secondary-subtle p-2' placeholder='説明を入力'/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}