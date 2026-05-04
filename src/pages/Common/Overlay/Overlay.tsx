import './Overlay.css';

type OverlayProps = {
  children: React.ReactNode;
}

function Overlay({ children }: OverlayProps) {
  return (
    <div className="overlay">
      {children}
    </div>
  );
}

export default Overlay;