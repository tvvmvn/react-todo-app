import { useState, useEffect } from 'react'
import Form from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Done: (task) => task.completed,
  Active: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function saveDoc(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function seedData() {
  const seed = [
    { id: "todo-0", name: "Work out", completed: true },
    { id: "todo-1", name: "Dance", completed: false },
    { id: "todo-2", name: "Eat", completed: false },
  ]

  saveDoc(seed);
}

// seedData();

export default function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [filter, setFilter] = useState("All");

  // key state tracking
  console.log(tasks);

  function addTask(name) {
    const newTask = { id: `todo-${Date.now()}`, name, completed: false };

    const updatedTasks = [...tasks, newTask];

    saveDoc(updatedTasks)

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);

    saveDoc(remainingTasks)

    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })

    saveDoc(updatedTasks)

    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task;
    })

    saveDoc(editedTasks)

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
    <div className="max-w-sm mt-8 mx-auto px-4">
      <h1 className="text-2xl font-semibold text-center my-4">
        TODO LIST &#128526; &#127928;
      </h1>

      <Form addTask={addTask} />

      <div className="flex flex-nowrap gap-1 mb-4">
        {filterButtons}
      </div>

      <h2 className="text-xl mb-4">
        <span className="font-semibold">{taskList.length}</span>
        {" "} task(s) remaining
      </h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}



