import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, [token]);

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task }),
      });
      const data = await res.json();
      setTodos([data, ...todos]);
      setTask("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });
      const data = await res.json();
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  const filteredTodos = todos.filter((t) =>
    t.task.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-md mt-11 mx-auto bg-white shadow-lg rounded-xl p-6">
      <div className="text-center sm:justify-between sm:items-center mb-3 sm:flex">
        <h1 className="text-2xl font-bold">Add Tasks</h1>
        <input
          type="text"
          className="sm:w-[198.4px] w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
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
          <TodoItem
            key={t._id}
            todo={t}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
