import { useState } from 'react'

function TodoList({ todos, setTodos, API_URL }) {
  const [loadingStates, setLoadingStates] = useState({})

  const toggleComplete = async (id, completed) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }))
    
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update todo')
      }
      
      const updatedTodo = await response.json()
      
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      )
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Failed to update task status. Please try again.')
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }))
    }
  }

  const deleteTodo = async (id) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }))
    
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }
      
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('Failed to delete task. Please try again.')
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }))
    }
  }

  if (todos.length === 0) {
    return <p className="empty-list">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <span className="todo-text">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
              disabled={loadingStates[todo.id]}
            />
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="todo-delete"
            disabled={loadingStates[todo.id]}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList