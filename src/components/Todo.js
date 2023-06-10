import { useState, useEffect, useRef } from "react";

export default function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const inputEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setIsEditing(false);
    setNewName("")
  }

  useEffect(() => {
    if (isEditing) {
      inputEl.current.focus();
    }
  })

  const viewTemplate = (
    <>
      {/* task name and checkbox */}
      <div className="flex mb-2">
        <label>
          <input
            type="checkbox"
            className="peer hidden"
            checked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <span className="text-xl peer-checked:line-through">
            {props.name}
          </span>
        </label>
      </div>

      {/* button group */}
      <div className="flex flex-nowrap gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="border-2 font-semibold px-2 py-1 w-full mb-2"
        >
          Edit
        </button>
        <button
          className="px-2 py-1 w-full mb-2 bg-red-500 text-white font-semibold"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </>
  );

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      {/* task input */}
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        value={newName || props.name}
        onChange={(e) => setNewName(e.target.value)}
        ref={inputEl}
      />

      {/* button group */}
      <div className="flex flex-nowrap gap-1">
        <button
          type="button"
          className="border-2 font-semibold w-1/2 p-1 border"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 p-1 disabled:opacity-50 bg-blue-500 text-white font-semibold"
          disabled={!newName.trim()}
        >
          Save
        </button>
      </div>
    </form>
  )

  return (
    <li className="mb-4">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}