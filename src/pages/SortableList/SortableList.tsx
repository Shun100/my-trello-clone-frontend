import 'bootstrap/dist/css/bootstrap.min.css';
import SortableCard from '../SortableCard/SortableCard';
import AddCardButton from '../AddCardButton/AddCardButton';
import type { Lane } from '../../modules/lane/lane.entity';

type SortableListProps = {
  lane: Lane;
}

function SortableList({ lane }: SortableListProps) {
  return (
    <>
      {
        <div className='d-flex justify-content-center pt-4'>
          <div className='bg-body-secondary border p-4 rounded'
                style={{ width: '100%', maxWidth: '450px' }}>
            <h4>{lane.title}</h4>
            {
              lane.cards.map(card => <SortableCard card={card} key={card.id} />)
            }
            <AddCardButton/>
          </div>
        </div>
      }
    </>
  );
}

export default SortableList;