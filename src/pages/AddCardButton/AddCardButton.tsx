import './AddCardButton.css'

function AddCardButton() {
  return (
    <div className="pt-4">
      <button
        className="add-card-btn rounded text-white border-0 px-3 py-2 text-center"
        style={{ width: "200px" }}
      >
        + カードを追加
      </button>
    </div>
  );
}

export default AddCardButton;