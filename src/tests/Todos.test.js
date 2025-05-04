import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../components/Todo';

describe('Todo suites', () => {

  // props
  const tasks = [
    { id: "todo-1", name: "Eat", completed: true },
    { id: "todo-2", name: "Sleep", completed: false },
    { id: "todo-3", name: "Repeat", completed: false },
  ]
  const deleteTask = jest.fn()
  const toggleTaskCompleted = jest.fn()
  const editTask = jest.fn()

  const taskList = tasks.map(task => (
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
  
  test("Rendering list", () => {
    const {debug} = render(taskList)

    tasks.forEach((task, index) => {
      expect(screen.getAllByRole("textbox")[index]).toHaveValue(task.name)
    })
  })

  test("Removing a task", () => {
    const {debug} = render(taskList)

    fireEvent.click(screen.getAllByText("-")[0])
    expect(deleteTask).toBeCalledWith("todo-1")
  })

  test("Toggling a task", () => {
    const {debug} = render(taskList)

    const cboxes = screen.getAllByRole("checkbox", {hidden: true})

    fireEvent.click(cboxes[0])

    expect(toggleTaskCompleted).toBeCalledWith("todo-1")
  })
});
