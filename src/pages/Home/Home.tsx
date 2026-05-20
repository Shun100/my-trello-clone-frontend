import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../Common/NavigationBar/NavigationBar';
import SideMenu from '../Common/SideMenu/SideMenu';
import { useEffect, useState } from 'react';
import SortableList from '../SortableList/SortableList';
import AddListButton from '../AddListButton/AddListButton';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { authRepository } from '../../modules/auth/auth.repository';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

function Home() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    authRepository
      .getCurrentUser()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.error(err);
        navigate('/signin');
      })
  });

  return (
    <>
      <NavigationBar onClick={() => setShowSideBar(true)}/>

      <div className="d-flex gap-3 px-4">
        <SortableList/>
        <SortableList/>
        <AddListButton/>
      </div>

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