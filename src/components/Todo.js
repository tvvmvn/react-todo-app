import { useState, useEffect, useRef } from "react";

export default function Todo({ 
  id, 
  name, 
  completed, 
  deleteTask, 
  toggleTaskCompleted, 
  editTask 
}) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false)
    setNewName(name)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  })

  const viewTemplate = (
    <>
      <div className="flex mb-2">
        <label>
          <input
            type="checkbox"
            className="peer hidden"
            checked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <span className="text-xl peer-checked:line-through">
            {name}
          </span>
        </label>
      </div>
      <div className="flex flex-nowrap gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="border-2 font-semibold px-2 py-1 w-full mb-2"
        >
          수정
        </button>
        <button
          className="px-2 py-1 w-full mb-2 bg-red-500 text-white font-semibold"
          onClick={() => deleteTask(id)}
        >
          삭제
        </button>
      </div>
    </>
  );

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        ref={inputRef}
      />
      <div className="flex flex-nowrap gap-1">
        <button
          type="button"
          className="border-2 font-semibold w-1/2 p-1 border"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          type="submit"
          className="w-1/2 p-1 disabled:opacity-50 bg-blue-500 text-white font-semibold"
          disabled={!newName || name === newName}
        >
          저장
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