import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SortableLane.css';
import SortableCard from '../SortableCard/SortableCard';
import AddCardButton from '../AddCardButton/AddCardButton';
import type { Lane } from '../../modules/lane/lane.entity';
import { useAtomValue, useSetAtom } from 'jotai';
import { boardAtom } from '../../modules/board/board.state';
import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import AddCardModal from '../AddCardModal/AddCardModal';
import { EditableTitle } from '../Common/EditableTitle/EditableTitle';
import { toastAtom } from '../../modules/toast/toast.state';
import { deleteLaneAtom } from '../../modules/lane/lane.state';
import { laneTask } from '../../modules/lane/lane.task';

type SortableLaneProps = {
  lane: Lane,
}

function SortableLane({ lane }: SortableLaneProps) {
  const board = useAtomValue(boardAtom);
  const [title, setTitle] = useState<string>(lane.title);
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const setShowToast = useSetAtom(toastAtom);
  const deleteAtom = useSetAtom(deleteLaneAtom);

  const updateTitle = (title: string) => laneTask
    .updateTitle(lane, title, setTitle)
    .catch(() => setShowToast(true));

  const deleteLane = () => laneTask
    .delete(board, lane.id, deleteAtom)
    .catch(() => setShowToast(true));

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
                    {lane.cards.map(card => <SortableCard laneId={lane.id} card={card} key={card.id} />)}
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