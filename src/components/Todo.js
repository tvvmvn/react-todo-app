export default function Todo({
  id,
  name,
  completed,
  deleteTask,
  toggleTaskCompleted,
  editTask
}) {

  function handleDelete() {
    var q = window.confirm("삭제하시겠습니까?");

    if (q) {
      deleteTask(id);
    }
  }

  return (
    <div style={{ 
        display: "flex", 
        alignItems: "center", 
        border: "1px solid #ddd", 
        borderRadius: "0.5rem",
        padding: "0.5rem",
        margin: "1rem 0" 
      }}
    >
      
      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
          style={{ display: "none" }}
        />
        <svg
          style={{ width: "1.5rem", fill: completed ? "#333" : "#ddd" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
        </svg>
      </label>

      {/* Input */}
      <input
        type="text"
        style={{ flexGrow: "1", fontSize: "1rem", padding: "0.5rem", margin: "0 1rem" }}
        value={name}
        onChange={(e) => editTask(id, e.target.value)}
      />

      {/* Delete button */}
      <button
        style={{ width: "1rem" }}
        onClick={handleDelete}
      >
        -
      </button>
    </div>
  );
}