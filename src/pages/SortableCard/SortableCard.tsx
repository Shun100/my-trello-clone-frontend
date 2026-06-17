import { useState } from 'react';
import type { Card } from '../../modules/card/card.entity';
import './SortableCard.css';
import { EditCardModal } from '../EditCardModal/EditCardModal';

type SortableCardProps = {
  laneId: string,
  card: Card,
}

function SortableCard({ laneId, card }: SortableCardProps) {
  const [showEditCardModal, setShowEditCardModal] = useState<boolean>(false);
  
  return (
    <>
      { showEditCardModal
        ? <EditCardModal
            laneId={laneId}
            card={card}
            close={() => setShowEditCardModal(false)}
          />
        : <div
            className='d-flex justify-content-center pt-4'
            data-bs-target="#exampleModalToggle"
            data-bs-toggle="modal"
            onClick={() => setShowEditCardModal(true)}
          >
            <div
              className='sortable-card bg-white border p-4 rounded shadow'
              style={{ width: '100%', maxWidth: '450px' }}
            >
              <h5>{card.title}</h5>
              <span>🕐 {card.dueDate.toISOString().split('T')[0]}</span>
            </div>
          </div>
      }
    </>
  );
}

export default SortableCard;