export default function FilterButton({ name, isPressed, setFilter }) {

  return (
    <button
      className="p-2 disabled:font-bold"
      disabled={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  )
}