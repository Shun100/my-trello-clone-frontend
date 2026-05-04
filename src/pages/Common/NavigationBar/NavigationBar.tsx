import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import LogoAndTitle from "../LogoAndTitle/LogoAndTitle";

type NavigationBarProps = {
  onClick: () => void;
}

function NavigationBar({ onClick }: NavigationBarProps) {
  return (
    <>
      <nav className="navbar navigation-bar">
        <div className="d-flex align-items-center px-4 gap-4">
          <HamburgerButton onClick={onClick}/>
          <LogoAndTitle />
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;