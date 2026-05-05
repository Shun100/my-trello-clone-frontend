import 'bootstrap/dist/css/bootstrap.min.css';
import SortableCard from '../SortableCard/SortableCard';
import AddCardButton from '../AddCardButton/AddCardButton';

function SortableList() {
  return (
    <>
      <div className='d-flex justify-content-center pt-4'>
        <div className='bg-body-secondary border p-4 rounded'
              style={{ width: '100%', maxWidth: '450px' }}>
          <h4>Sample List</h4>
          <SortableCard/>
          <SortableCard/>
          <AddCardButton/>
        </div>
      </div>
    </>
  );
}

export default SortableList;