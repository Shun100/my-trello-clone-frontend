import type { Card } from '../../modules/card/card.entity';
import './SortableCard.css';

type SortableCardProps = {
  card: Card;
}

function SortableCard({ card }: SortableCardProps) {
  return (
    <div className='d-flex justify-content-center pt-4'>
      <div
        className='sortable-card bg-white border p-4 rounded shadow'
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <h5>{card.title}</h5>
        <span>🕐 期限を設定してください</span>
      </div>
    </div>
  );
}

export default SortableCard;