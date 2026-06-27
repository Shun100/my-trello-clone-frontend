import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SortableLane.css';
import SortableCard from '../SortableCard/SortableCard';
import AddCardButton from '../AddCardButton/AddCardButton';
import type { Lane } from '../../modules/lane/lane.entity';
import { laneRepository } from '../../modules/lane/lane.repository';
import { useAtom, useSetAtom } from 'jotai';
import { boardAtom } from '../../modules/board/board.state';
import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import AddCardModal from '../AddCardModal/AddCardModal';
import { EditableTitle } from '../Common/EditableTitle/EditableTitle';
import { toastAtom } from '../../modules/toast/toast.state';

type SortableLaneProps = {
  lane: Lane,
}

function SortableLane({ lane }: SortableLaneProps) {
  const [board, setBoard] = useAtom(boardAtom);
  const [title, setTitle] = useState<string>(lane.title);
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const setShowToast = useSetAtom(toastAtom);

  // 先にDB更新 ⇒ 画面更新の順
  const updateTitle = async (newTitle: string) => {
    try {
      // DB更新
      await laneRepository.update([{
        id: lane.id,
        title: newTitle,
        position: lane.position
      }]);
    } catch (e) {
      console.error(e);
      setShowToast(true);
      return;
    }

    setTitle(newTitle);
  }

  // 削除は取り返しがつかない操作なので、先にDBから削除 ⇒ 画面から削除の順
  const deleteLane = async () => {
    if (!board) {
      console.error('board not exist');
      setShowToast(true);
      return;
    }

    try {
      await laneRepository.delete(lane.id);
    } catch (e) {
      console.error(e);
      setShowToast(true);
      return;
    }
    
    const currentLanes = board.lanes;
    const updatedLanes = currentLanes
      .filter(l => l.id !== lane.id)
      .map(l => ({
        ...l,
        position: l.position > lane.position
          ? l.position - 1
          : l.position
      }));

    setBoard({
      ...board,
      lanes: [...updatedLanes],
    });
  }


  return (
    <>
      <Draggable
        draggableId={lane.id}
        index={lane.position}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='d-flex justify-content-center pt-4'
          >
            <div
              className='bg-body-secondary border p-4 rounded'
              style={{ width: '100%', maxWidth: '450px' }}
            >
              
              <div className="d-flex align-items-center justify-content-between">
              
                {/* タイトル */}
                <EditableTitle
                  title={title}
                  setTitle={setTitle}
                  onBlur={e => updateTitle(e.target.textContent.trim())}
                />

                <i
                  className="bi bi-trash delete-button"
                  onClick={deleteLane}
                />
              </div>
              {
                lane.cards.map(card => <SortableCard laneId={lane.id} card={card} key={card.id} />)
              }

              {
                showAddCardModal
                  ? <AddCardModal laneId={lane.id} closeModal={() => setShowAddCardModal(false)}/>
                  : <AddCardButton onClick={() => setShowAddCardModal(true)}/>
              }
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default SortableLane;