import { useState } from 'react'
import '../App.css';

function AddTodo({ setTodos, API_URL }) {
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return;
    
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo.trim(), completed: false }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add todo')
      }
      
      const addedTodo = await response.json()
      setTodos(prevTodos => [...prevTodos, addedTodo])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
      alert('Failed to add task. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !newTodo.trim()}>
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default AddTodo