import { useState } from "react";

export default function Form({ addTask }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTask(name);
    setName("");
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="p-1 w-full disabled:opacity-50 bg-blue-500 text-white font-semibold"
        disabled={!name.trim()}
      >
        Add
      </button>
    </form>
  )
}