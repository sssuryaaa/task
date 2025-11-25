const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="flex justify-between items-center p-2 border rounded-lg">
      <span
        onClick={() => onToggle(todo._id, todo.completed)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.task}
      </span>
      <button
        onClick={() => onDelete(todo._id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
