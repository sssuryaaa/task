import React from "react";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="flex justify-between items-center border p-3 rounded-lg shadow-sm bg-gray-50">
      <span className="text-gray-800">{todo.text}</span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-600 hover:text-red-800 font-semibold"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
