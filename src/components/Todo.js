export default function Todo({
  id,
  name,
  completed,
  deleteTask,
  toggleTaskCompleted,
  editTask
}) {

  function handleDelete() {
    var q = window.confirm("정말 삭제하시겠습니까?");

    if (q) {
      deleteTask(id);
    }
  }

  return (
    <div className="flex items-center mb-3 border py-4 rounded-xl">
      <label className="mx-4">
        <input
          type="checkbox"
          id={id}
          className="peer hidden"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <svg
          className="w-6 fill-gray-200 peer-checked:fill-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
        </svg>
      </label>
      <input
        type="text"
        className="grow outline-none"
        value={name}
        onChange={(e) => editTask(id, e.target.value)}
      />
      <button
        className="px-4"
        onClick={handleDelete}
      >
        <svg
          className="w-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
    </div>
  );
}