import { render, screen, fireEvent } from '@testing-library/react';
import FilterButton from '../components/FilterButton';

describe("Filter button", () => {

  const FILTER_NAMES = ["All", "Done", "Active"]
  const setFilter = jest.fn()

  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      filter="All"
      setFilter={setFilter}
    />
  ))

  test("Rendering", () => {
    const {debug} = render(filterButtons)

    FILTER_NAMES.forEach(name => {
      screen.getByText(name)
    })
  })

  test("Clicking Done", () => {
    const {debug} = render(filterButtons)

    fireEvent.click(screen.getByText("Done"))

    expect(setFilter).toBeCalledWith("Done")
  })

  test("Clicking Active", () => {
    const {debug} = render(filterButtons)

    fireEvent.click(screen.getByText("Active"))

    expect(setFilter).toBeCalledWith("Active")
  })
})