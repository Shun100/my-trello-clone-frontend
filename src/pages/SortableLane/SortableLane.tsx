import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SortableLane.css';
import SortableCard from '../SortableCard/SortableCard';
import AddCardButton from '../AddCardButton/AddCardButton';
import type { Lane } from '../../modules/lane/lane.entity';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import AddCardModal from '../AddCardModal/AddCardModal';
import { EditableTitle } from '../Common/EditableTitle/EditableTitle';
import { toastAtom } from '../../modules/toast/toast.state';
import { laneTask } from '../../modules/lane/lane.task';
import { cardsAtom } from '../../modules/card/card.state';
import { deleteLaneAtom } from '../../modules/lane/lane.state';

type SortableLaneProps = {
  lane: Lane,
}

function SortableLane({ lane }: SortableLaneProps) {
  const cards = useAtomValue(cardsAtom);
  const [title, setTitle] = useState<string>(lane.title);
  const deleteAtom = useSetAtom(deleteLaneAtom);
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const setShowToast = useSetAtom(toastAtom);

  const updateTitle = (title: string) => laneTask.updateTitle(
    lane,
    title,
    setTitle,
    () => setShowToast(true)
  );

  const deleteLane = () => laneTask.delete(
    lane.id,
    deleteAtom,
    () => setShowToast(true)
  );

  return (
    <>
      <Draggable draggableId={lane.id} index={lane.position}>
        {provided=> (
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
                <EditableTitle
                  title={title}
                  setTitle={setTitle}
                  onBlur={e => updateTitle(e.target.textContent.trim())}
                />
                <i className="bi bi-trash delete-button" onClick={deleteLane} />
              </div>
              <Droppable droppableId={lane.id} type="card">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {
                      cards
                        .filter(card => card.laneId === lane.id)
                        .sort((a, b) => a.position - b.position)
                        .map(card => <SortableCard card={card} key={card.id} />)
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Card追加画面 */}
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