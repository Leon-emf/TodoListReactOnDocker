function TodoItem({ todo, setTodos }) {
  const handleToggle = () => {
    setTodos(prev =>
      prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const handleDelete = () => {
    setTodos(prev => prev.filter(t => t.id !== todo.id))
  }

  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
        onClick={handleToggle}
      >
        {todo.text}
      </span>
      <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem