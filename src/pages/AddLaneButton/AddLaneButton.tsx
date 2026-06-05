import './AddLaneButton.css'

type AddLaneButtonProps = {
  onClick: () => void;
}

function AddLaneButton({ onClick }: AddLaneButtonProps) {
  return (

    <div className="pt-4" style={{ width: "200px" }}>
      <button
        className="add-list-btn rounded text-white border-0 px-3 py-2 text-center"
        onClick={onClick}
      >
        + レーンを追加
      </button>
    </div>
  );
}

export default AddLaneButton;