import { useState, useEffect, useRef } from "react";

export default function Form({ addTask }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);


  /*
    useRef Hook

    it can access real element in document
    it store real element in current variable.
  */

 
  function handleSubmit(e) {
    e.preventDefault();
    addTask(name);
    setName("");
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 px-2 py-1 w-full outline-none mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={inputRef}
        autoComplete="off"
      />
      <button
        type="submit"
        className="p-1 w-full disabled:opacity-50 bg-blue-500 text-white font-semibold"
        disabled={!name.trim()}
      >
        추가하기
      </button>
    </form>
  )
}