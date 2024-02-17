export default function Form({ addTask }) {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
      onClick={addTask}
    >
      Add
    </button>
  )
}