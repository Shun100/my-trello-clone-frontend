import './AddListButton.css';

function AddListButton() {
  return (
    <div className="pt-4">
      <button
        className="add-list-btn rounded text-white border-0 px-3 py-2 text-center"
        style={{ width: "200px" }}
      >
        + リストを追加
      </button>
    </div>
  );
}

export default AddListButton;