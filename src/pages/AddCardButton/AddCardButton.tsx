import './AddCardButton.css'

type AddCardButtonProps = {
  onClick: () => void;
}

function AddCardButton({ onClick }: AddCardButtonProps) {
  return (
    <div className="pt-4">
      <button
        className="add-card-btn rounded text-white border-0 px-3 py-2 text-center"
        style={{ width: "200px" }}
        onClick={onClick}
      >
        + カードを追加
      </button>
    </div>
  );
}

export default AddCardButton;