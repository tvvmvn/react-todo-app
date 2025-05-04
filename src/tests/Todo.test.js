import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../components/Todo';

describe('Todo suites', () => {

  const props = { 
    id: "todo-1", 
    name: "Eat", 
    completed: true,
    deleteTask: jest.fn(),
    toggleTaskCompleted: jest.fn(),
    editTask: jest.fn()
  }

  test("Rendering", () => {
    const { debug } = render(<Todo {...props} />);

    expect(screen.getByRole("textbox")).toHaveValue(props.name)
  })
  
  test("Removing a task", () => {
    const { debug } = render(<Todo {...props} />);

    fireEvent.click(screen.getByText("-"))

    expect(props.deleteTask).toBeCalledWith("todo-1")
  })

  test("Toggling a task", () => {
    const { debug } = render(<Todo {...props} />);

    fireEvent.click(screen.getByRole("checkbox", {hidden: true}))

    expect(props.toggleTaskCompleted).toBeCalledWith("todo-1")
  })
});
