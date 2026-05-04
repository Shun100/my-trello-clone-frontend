import 'bootstrap/dist/css/bootstrap.min.css';
import './SideMenu.css';
import Overlay from '../Overlay/Overlay';

type SideBarProps = {
  close: () => void;
}

function SideMenu({ close }: SideBarProps) {
  return (
    <Overlay children={
      <div className="sidebar open">
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn-close" onClick={close}/>
            <span>ユーザ名</span>
            <button className="btn btn-sm btn-outline-secondary me-2">
              ✏️
            </button>
          </div>

          <hr />

          <button className="btn btn-outline-danger w-100">
            ログアウト
          </button>
        </div>
      </div>
    }/>
  );
}

export default SideMenu;