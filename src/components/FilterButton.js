export default function FilterButton({ name, filter, setFilter }) {
  
  return (
    <button
      key={name}
      onClick={() => setFilter(name)}
      style={{ 
        fontSize: "1rem",
        fontWeight: filter == name ? "bold" : "normal"
      }}
      disabled={name == filter}
    >
      {name}
    </button>
  )
}
