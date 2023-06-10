import { useState, useEffect, useRef } from 'react';

const FILTER_MAP = {
  All: () => true,
  Done: (task) => task.completed,
  Active: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function saveDoc(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const initialTasks = JSON.parse(localStorage.getItem('tasks') || "[]");

export default function App() {

  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');

  // console.log(tasks);

  function addTask(name) {
    const newTask = { id: `todo-${Date.now()}`, name, completed: false };

    const updatedTasks = [...tasks, newTask];

    saveDoc(updatedTasks);

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);

    saveDoc(remainingTasks);

    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })

    saveDoc(updatedTasks);

    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task;
    })

    saveDoc(editedTasks);

    setTasks(editedTasks);
  }

  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={filter === name}
      setFilter={setFilter}
    />
  ))

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ))

  return (
    <div className="app-container">
      {/* title */}
      <h1 className="app-title">Todo List &#128526; &#127928;</h1>

      {/* form */}
      <Form addTask={addTask} />

      {/* filter buttons */}
      <div className="filter-btn-group">
        {filterButtons}
      </div>

      {/* task list */}
      <h2 className="remaining"> {taskList.length} task(s) remaining</h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}

function Form({ addTask }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTask(name);
    setName("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="add-btn"
        disabled={!name.trim()}
      >
        Add
      </button>
    </form>
  )
}

function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      className={`filter-btn ${isPressed && "active"}`}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  )
}

function Todo({ id, name, completed, deleteTask, toggleTaskCompleted, editTask }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const inputEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setIsEditing(false);
    setNewName("");
  }

  useEffect(() => {
    if (isEditing) {
      inputEl.current.focus();
    }
  })

  const viewTemplate = (
    <div className="view-template">
      {/* task name and checkbox */}
      <div className="todo-details">
        <input
          type="checkbox"
          id={id}
          className="todo-checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id} className="todo-name">
          {name}
        </label>
      </div>

      {/* button group */}
      <div className="view-btn-group">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-btn"
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteTask(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="edit-template">
      {/* edit input */}
      <input
        type="text"
        className="edit-input"
        value={newName || name}
        onChange={(e) => setNewName(e.target.value)}
        ref={inputEl}
      />

      {/* button group */}
      <div className="edit-btn-group">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="save-btn"
          disabled={!newName.trim()}
        >
          Save
        </button>
      </div>
    </form>
  )

  return (
    <li className="todo-item">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}