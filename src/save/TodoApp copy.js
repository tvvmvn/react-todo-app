import { useState, useEffect, useRef } from 'react'
// import styles from '../Todo.module.css'

const FILTER_MAP = {
  All: () => true,
  Done: (task) => task.completed,
  Active: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  console.log(tasks);

  useEffect(() => {
    const data = localStorage.getItem('tasks') || '[]';
    const _tasks = JSON.parse(data);

    setTasks(_tasks);
  }, [])

  function addTask(name) {
    const newTask = { id: `todo-${Math.random()}`, name, completed: false };

    const updatedTasks = [...tasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(remainingTasks));

    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task;
    })

    localStorage.setItem('tasks', JSON.stringify(editedTasks));

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
    <div className="max-w-sm mx-auto mt-8 border p-4 bg-white">
      {/* title */}
      <h1 className="text-2xl text-center mb-4">Todo List &#128526; &#127928;</h1>

      {/* form */}
      <Form addTask={addTask} />

      {/* filter buttons */}
      <div className="flex flex-nowrap gap-1 mb-4">
        {filterButtons}
      </div>

      {/* task list */}
      <h2 className="text-xl mb-4">
        <span className="font-semibold">{taskList.length} </span>
        task(s) remaining</h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}

function Form(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="p-1 w-full border disabled:opacity-50 text-blue-500"
        disabled={!name.trim()}
      >
        Add
      </button>
    </form>
  )
}

function FilterButton(props) {

  return (
    <button
      className={"p-1 w-1/3 border " + (props.isPressed && "outline")}
      onClick={() => props.setFilter(props.name)}
    >
      {props.name}
    </button>
  )
}

function Todo(props) {
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
          className="border px-2 py-1 w-full mb-2"
        >
          Edit
        </button>
        <button
          className="border px-2 py-1 w-full mb-2 text-red-500"
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
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        ref={inputEl}
      />

      {/* button group */}
      <div className="flex flex-nowrap gap-1">
        <button
          type="button"
          className="w-1/2 p-1 border"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 p-1 border disabled:opacity-50 text-blue-500"
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