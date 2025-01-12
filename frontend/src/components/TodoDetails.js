import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/todos/${id}`);
        setTodo(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Todo not found');
        } else {
          console.error('Error fetching the todo', error);
        }
      }
    };
    
    fetchTodo();
  }, [id]);
  
  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-md">
        <h1 className="text-3xl text-white font-bold text-center mb-4">Todo Details</h1>
        <div className="text-white">
          <h2 className="text-2xl font-bold">{todo.title}</h2>
          <p className="mt-2">Completed: {todo.completed ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
