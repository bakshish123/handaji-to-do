import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editTodo, setEditTodo] = useState(null); 
  const [editTitle, setEditTitle] = useState(''); 

  useEffect(() => {
    fetchTodos();
  }, []);


  

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3001/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post('http://localhost:3001/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    fetchTodos();
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    await axios.put(`http://localhost:3001/todos/${editTodo.id}`, { title: editTitle, completed: editTodo.completed });
    setEditTodo(null);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-md">
        <h1 className="text-3xl text-white font-bold text-center mb-4">Todo List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task"
          />
          <button
            onClick={addTodo}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Todo
          </button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between items-center mb-2">
              <Link
                to={`/todos/${todo.id}`}
                className={`flex-1 text-white cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              >
                {todo.title}
              </Link>
              <button
                onClick={() => handleEditClick(todo)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Todo Modal */}
      {editTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Edit task title"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditTodo(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
