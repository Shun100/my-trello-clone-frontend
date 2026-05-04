import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import Hamburger from "../Hamburger";
import Logo from "../Logo/Logo";

function NavigationBar() {
  return (
    <>
      <nav className="navbar navigation-bar">
        <div className="d-flex">
          <Hamburger />
          <Logo />
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;