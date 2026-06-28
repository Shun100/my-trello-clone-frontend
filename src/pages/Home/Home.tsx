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
import { laneRepository } from '../../modules/lane/lane.repository';
import { constantsAtom } from '../../modules/constants/constants';
import constRepository from '../../modules/constants/constants.repository';
import { toastAtom } from '../../modules/toast/toast.state';
import { ErrorToast } from '../Common/Error/ErrorToast';
import { updateLanePositionAtom } from '../../modules/lane/lane.state';
import { laneTask } from '../../modules/lane/lane.task';

function Home() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [board, setBoard] = useAtom(boardAtom);
  const [showAddLaneModal, setShowAddLaneModal] = useState<boolean>(false);
  const setConstants = useSetAtom(constantsAtom);
  const setShowToast = useSetAtom(toastAtom);
  const updatePositionAtom = useSetAtom(updateLanePositionAtom);
  const navigate = useNavigate();

  const updatePosition = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (type === 'lane') {
      laneTask
        .updatePosition(board, source.index, destination.index, updatePositionAtom)
        .catch(() => {
          setShowToast(true);
          setBoard(board); // 画面ロールバック
        })
    } else if (type === 'card') {
      console.log(result);
    }    
  }

  useEffect(() => {
    const init = async () => {
      try {
        const user = await authRepository.getCurrentUser();
        setCurrentUser(user);
        const board = await boardRepository.fetch(user.id);
        setBoard(board);
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
      {/* Toast通知 */}
      <ErrorToast />

      <NavigationBar onClick={() => setShowSideBar(true)}/>
      <DragDropContext onDragEnd={updatePosition}>
        <Droppable droppableId='board' direction='horizontal' type="lane">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex gap-3 px-4"
            >
              {board?.lanes.map(lane => <SortableLane lane={lane} key={lane.id} />)}
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