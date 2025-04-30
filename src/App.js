import { useState, useEffect } from 'react'
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';

const DATA = [
  { id: "todo-1", name: "Eat", completed: true },
  { id: "todo-2", name: "Sleep", completed: false },
  { id: "todo-3", name: "Repeat", completed: false },
]

const FILTER_MAP = {
  전체: () => true,
  완료: (task) => task.completed,
  미완료: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState("전체");

  // key state tracking
  console.log(tasks);

  // title update
  useEffect(() => {
    document.title = "Todo List";
  }, [])

  function addTask() {
    const newTask = {
      id: `todo-${Date.now()}`,
      name: "",
      completed: false
    };

    const updatedTasks = [newTask, ...tasks];

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);

    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })

    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task;
    })

    setTasks(editedTasks);
  }

  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton 
      name={name} 
      filter={filter} 
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "20rem", padding: "0 1rem" }}>
        
        {/* Logo */}
        <h1 style={{ fontSize: "2rem", margin: "2rem 0", textAlign: "center" }}>
          Todo List
        </h1>

          {/* Filter buttons */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            margin: "1.5rem 0" }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {filterButtons}
            </div>
            
          {/* Add button (Mobile app doesn't need hover effect.) */}
          <button
            type="submit"
            onClick={addTask}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            새 할일+
          </button>
        </div>

        {/* The number of items */}
        <h3 style={{ margin: "1rem 0" }}>
          총 {taskList.length}개 있습니다
        </h3>

        {/* Task list */}
        <ul> 
          {taskList}
        </ul>
      </div>
    </div>
  )
}



