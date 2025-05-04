import { IoCheckboxSharp } from "react-icons/io5";

export default function Todo({
  id,
  name,
  completed,
  deleteTask,
  toggleTaskCompleted,
  editTask
}) {

  return (
    <div 
      role="todo"
      style={{ 
        display: "flex", 
        alignItems: "center", 
        border: "1px solid #ddd", 
        padding: "0.5rem",
        margin: "1rem 0" 
      }}
    >
      
      {/* Checkbox */}
      <label role="box">
        <input
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
          style={{ display: "none" }}
        />
        <IoCheckboxSharp
          size={24}
          fill={completed ? "#333" : "#eee"}
        />
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
        onClick={() => deleteTask(id)}
      >
        -
      </button>
    </div>
  );
}