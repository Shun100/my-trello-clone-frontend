import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../Common/NavigationBar/NavigationBar';
import SideMenu from '../Common/SideMenu/SideMenu';
import { useEffect, useState } from 'react';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { authRepository } from '../../modules/auth/auth.repository';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { boardRepository } from '../../modules/board/board.repository';
import SortableLane from '../SortableLane/SortableLane';
import AddLaneButton from '../AddLaneButton/AddLaneButton';
import { boardAtom } from '../../modules/board/board.state';
import AddLaneModal from '../AddLaneModal/AddLaneModal';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { constantsAtom } from '../../modules/constants/constants';
import constRepository from '../../modules/constants/constants.repository';
import { toastAtom } from '../../modules/toast/toast.state';
import { ErrorToast } from '../Common/Error/ErrorToast';
import { laneTask } from '../../modules/lane/lane.task';
import { cardTask } from '../../modules/card/card.task';
import { lanesAtom } from '../../modules/lane/lane.state';
import { cardsAtom } from '../../modules/card/card.state';

function Home() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const setBoard = useSetAtom(boardAtom);
  const [lanes, setLanes] = useAtom(lanesAtom);
  const [cards, setCards] = useAtom(cardsAtom);
  const [showAddLaneModal, setShowAddLaneModal] = useState<boolean>(false);
  const setConstants = useSetAtom(constantsAtom);
  const setShowToast = useSetAtom(toastAtom);
  const navigate = useNavigate();

  const updatePosition = (result: DropResult) => {
    console.log(JSON.stringify(result, null, 2));

    const { destination, source, type } = result;

    if (!destination) {
      setShowToast(true);
      return;
    }

    if (type === 'lane') {
      laneTask.updatePosition({
        params: { lanes, src: source.index, dst: destination!.index },
        updateView: setLanes,
        onError: () => setShowToast(true)
      });

    } else if (type === 'card') {
      const srcLaneId = result.source.droppableId;
      const dstLaneId = result.destination!.droppableId;
      const srcPosition = result.source.index;
      const dstPosition = result.destination!.index;
      
      if (srcLaneId === dstLaneId) {
        cardTask.sortWithinLane({
          params: { cards, laneId: srcLaneId, srcPosition, dstPosition },
          updateView: setCards,
          onError: () => setShowToast(true) 
        });
      } else {
        cardTask.sortAcrossLane({
          params: { cards, srcLaneId, dstLaneId, srcPosition, dstPosition },
          updateView: setCards,
          onError: () => setShowToast(true)
        });
      }
    }    
  }

  useEffect(() => {
    const init = async () => {
      try {
        const user = await authRepository.getCurrentUser();
        setCurrentUser(user);

        const { board, lanes, cards } = await boardRepository.fetch(user.id);
        setBoard(board);
        setLanes(lanes);
        setCards(cards);

        const constants = await constRepository.get();
        setConstants(constants);
        
      } catch (err) {
        console.error(err);
        navigate('/signin');
      }};
    
    init();
  }, []);

  return (
    <>
      <ErrorToast /> {/* Toast通知 */}

      <NavigationBar onClick={() => setShowSideBar(true)}/>
      <DragDropContext onDragEnd={updatePosition}>
        <Droppable droppableId='board' direction='horizontal' type="lane">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex gap-3 px-4"
            >
              {
                lanes
                  .sort((a, b) => a.position - b.position)
                  .map(lane => <SortableLane lane={lane} key={lane.id} />)
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

      {/* SideBar */}
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