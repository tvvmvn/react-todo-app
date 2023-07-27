export default function FilterButton({ name, isPressed, setFilter }) {

  return (
    <button
      className={"border-2 border-black p-1 w-1/3 border font-semibold " + (isPressed && "bg-black text-white")}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  )
}