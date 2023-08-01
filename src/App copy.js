import { useState, useEffect } from 'react'
import Form from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';

const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

const filters = [
  { id: 1, name: "All", condition: () => true },
  { id: 2, name: "Done", condition: (task) => task.completed },
  { id: 3, name: "Active", condition: (task) => !task.completed },
]

function saveDoc(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState(filters[0]);

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

  const filterButtons = filters.map(_filter => (
    <FilterButton
      key={_filter.name}
      name={_filter.name}
      isPressed={_filter.name === filter.name}
      filter={_filter}
      setFilter={setFilter}
    />
  ))

  const taskList = tasks
    .filter(filter.condition)
    .map(task => (
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
    <div className="max-w-sm mx-auto mt-8 border p-8 bg-white">
      <h1 className="text-2xl font-semibold text-center mb-4">TODO LIST &#128526; &#127928;</h1>

      <Form addTask={addTask} />

      <div className="flex flex-nowrap gap-1 mb-4">
        {filterButtons}
      </div>

      <h2 className="text-xl mb-4">
        <span className="font-semibold">{taskList.length} </span>
        task(s) remaining</h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}



