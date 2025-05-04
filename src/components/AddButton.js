export default function AddButton({ addTask }) {
  return (
    <button
      type="submit"
      onClick={addTask}
      style={{ fontSize: "1rem", fontWeight: "bold" }}
    >
      새 할일+
    </button>
  )
}