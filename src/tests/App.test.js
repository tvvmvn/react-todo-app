import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Todo Scenario', () => {

  test("Adding a task", () => {
    render(<App />)

    fireEvent.click(screen.getByText("새 할일+"))

    expect(screen.getAllByRole("todo").length).toBe(4)
  })

  test("Filtering list", () => {
    render(<App />)

    expect(screen.getAllByRole("todo").length).toBe(3)

    fireEvent.click(screen.getByText("완료"))
    expect(screen.getAllByRole("todo").length).toBe(1)

    fireEvent.click(screen.getByText("미완료"))
    expect(screen.getAllByRole("todo").length).toBe(2)
  })

  test("Removing a task", () => {
    render(<App />)

    fireEvent.click(screen.getAllByText("-")[0])
    expect(screen.getAllByRole("todo").length).toBe(2)
  })

  test("Toggling a task", () => {
    render(<App />)

    const cboxes = screen.getAllByRole("checkbox", {hidden: true})

    expect(cboxes[0]).toBeChecked()

    fireEvent.click(screen.getAllByRole("box")[0])
    expect(cboxes[0]).not.toBeChecked()
  })
});
