import { useState, useEffect } from 'react'
import Form from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';


function seedData() {
  const seed = [
    { id: "todo-0", name: "Work out", completed: true },
    { id: "todo-1", name: "Dance", completed: false },
    { id: "todo-2", name: "Eat", completed: false },
  ]

  saveDoc(seed);
}

if (!localStorage.getItem("tasks")) {
  seedData();
}

function saveDoc(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const FILTER_MAP = {
  전체: () => true,
  완료: (task) => task.completed,
  미완료: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [filter, setFilter] = useState("전체");

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

  useEffect(() => {
    document.title = "Todo List"
  }, [])

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
        Todo List &#128526; &#127928;
      </h1>

      <Form addTask={addTask} />

      <div className="grid grid-cols-3 gap-1 mb-4">
        {filterButtons}
      </div>

      <h2 className="font-semibold mb-4">
        총 {taskList.length}개 있습니다
      </h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}



