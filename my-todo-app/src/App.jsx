import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

// API URL constant
const API_URL = 'https://todolistreactondocker-production.up.railway.app/api';

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>Todo List</h1>
      {loading ? (
        <p>Loading todos...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <AddTodo setTodos={setTodos} API_URL={API_URL} />
          <TodoList todos={todos} setTodos={setTodos} API_URL={API_URL} />
        </>
      )}
    </div>
  )
}

export default App