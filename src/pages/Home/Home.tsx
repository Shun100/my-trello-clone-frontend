import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../Common/NavigationBar/NavigationBar';
import SideMenu from '../Common/SideMenu/SideMenu';
import { useEffect, useState } from 'react';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { authRepository } from '../../modules/auth/auth.repository';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { boardRepository } from '../../modules/board/board.repository';
import SortableLane from '../SortableLane/SortableLane';
import AddLaneButton from '../AddLaneButton/AddLaneButton';
import { boardAtom } from '../../modules/board/board.state';
import AddLaneModal from '../AddLaneModal/AddLaneModal';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { laneRepository } from '../../modules/lane/lane.repository';

function Home() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [board, setBoard] = useAtom(boardAtom);
  const [showAddLaneModal, setShowAddLaneModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const updatePosition = (result: DropResult) => {
    if (!board) { return; }
    if (!result.destination) { return; }

    const lanesAfterDnd = [...board.lanes];

    // array.splice(start, deleteCount, itemToAdd1, itemToAdd2, ...)
    const [moved] = lanesAfterDnd.splice(result.source.index, 1);
    lanesAfterDnd.splice(result.destination.index, 0, moved);
    lanesAfterDnd.forEach((lane, index) => lane.position = index);

    setBoard({
      ...board,
      lanes: lanesAfterDnd
    });

    laneRepository.update(lanesAfterDnd);
  }

  useEffect(() => {
    const init = async () => {
      try {
        const user = await authRepository.getCurrentUser();
        setCurrentUser(user);
        const board = await boardRepository.fetch(user.id);
        setBoard(board);
        
      } catch (err) {
        console.error(err);
        navigate('/signin');
      }};
    
    init();
  }, []);

  return (
    <>
      <NavigationBar onClick={() => setShowSideBar(true)}/>

      <DragDropContext
        onDragEnd={updatePosition}
      >
        <Droppable
          droppableId='board' // TODO: board.idに書き直す
          direction='horizontal'
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex gap-3 px-4"
            >
              {
                board?.lanes.map(lane => <SortableLane lane={lane} key={lane.id} />)
              }

              {provided.placeholder}

              {
                showAddLaneModal ?
                  <AddLaneModal closeModal={() => setShowAddLaneModal(false)}/> :
                  <AddLaneButton onClick={() => setShowAddLaneModal(true)}/>
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {showSideBar &&
        <SideMenu
          userName={currentUser?.name ?? 'ゲスト'}
          close={() => setShowSideBar(false)}
        />
      }
    </>
  );
}

export default Home;