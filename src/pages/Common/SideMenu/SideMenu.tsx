import 'bootstrap/dist/css/bootstrap.min.css';
import './SideMenu.css';
import Overlay from '../Overlay/Overlay';
import { utils } from '../../../modules/utils/utils';
import { useNavigate } from 'react-router-dom';

type SideBarProps = {
  userName: string,
  close: () => void;
}

function SideMenu({ userName, close }: SideBarProps) {
  const navigate = useNavigate();

  const signout = () => {
    utils.deleteToken();
    navigate('/signin');
  }


  return (
    <Overlay children={
      <div className="sidebar open">
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn-close" onClick={close}/>
            <span>{userName}</span>
            <button className="btn btn-sm btn-outline-secondary me-2">
              ✏️
            </button>
          </div>

          <hr />

          <button
            className="btn btn-outline-danger w-100"
            onClick={signout}
          >
            Signout
          </button>
        </div>
      </div>
    }/>
  );
}

export default SideMenu;