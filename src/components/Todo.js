import React, { useState } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;

    setTodos([...todos, { id: Date.now(), text: task }]);
    setTask("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-md mt-11 mx-auto bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold ">Add Tasks</h1>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
          type="text"
          value={task}
          placeholder="Enter task..."
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {filteredTodos.map((t) => (
          <TodoItem key={t.id} todo={t} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
