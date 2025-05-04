import { render, screen, fireEvent } from '@testing-library/react';
import AddButton from '../components/AddButton';

describe('AddButton suites', () => {

  const addTask = jest.fn()

  test("Rendering", () => {
    render(<AddButton addTask={addTask} />);

    expect(screen.getByRole("button")).toBeTruthy()
  })

  test("Adding an item", () => {  
    render(<AddButton addTask={addTask} />);

    fireEvent.click(screen.getByRole("button"))

    expect(addTask).toBeCalled()
  })
});
