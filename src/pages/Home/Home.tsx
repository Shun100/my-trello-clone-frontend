import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../Common/NavigationBar/NavigationBar';
import SideMenu from '../Common/SideMenu/SideMenu';
import { useState } from 'react';

function Home() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <>
      <NavigationBar onClick={() => setShowSideBar(true)}/>
      {showSideBar &&
        <SideMenu close={() => setShowSideBar(false)}/>
      }
    </>
  );
}

export default Home;