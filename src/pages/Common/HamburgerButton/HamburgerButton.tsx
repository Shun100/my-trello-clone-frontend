import './HamburgerButton.css';

type HamburgerProps = {
  onClick: () => void;
}

function HamburgerButton({ onClick }: HamburgerProps) {
  return (
    <svg
      className='icon' width="32" height="32" viewBox="0 0 24 24" fill="currentColor"
      onClick={onClick}
    >
      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  );
}

export default HamburgerButton;