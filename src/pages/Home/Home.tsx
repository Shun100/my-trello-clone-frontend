import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../Common/NavigationBar/NavigationBar';
import SideMenu from '../Common/SideMenu/SideMenu';
import { useState } from 'react';
import SortableList from '../SortableList/SortableList';
import AddListButton from '../AddListButton/AddListButton';

function Home() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <>
      <NavigationBar onClick={() => setShowSideBar(true)}/>

      <div className="d-flex gap-3 px-4">
        <SortableList/>
        <SortableList/>
        <AddListButton/>
      </div>

      {showSideBar &&
        <SideMenu close={() => setShowSideBar(false)}/>
      }
    </>
  );
}

export default Home;