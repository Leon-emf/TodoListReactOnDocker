const pool = require('../config/database');

// Get all todos
exports.getAllTodos = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// Create a new todo
exports.createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      const error = new Error('Text is required');
      error.statusCode = 400;
      throw error;
    }
    
    const [result] = await pool.query(
      'INSERT INTO todos (text, completed) VALUES (?, ?)',
      [text, false]
    );
    
    const [newTodo] = await pool.query(
      'SELECT * FROM todos WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newTodo[0]);
  } catch (error) {
    next(error);
  }
};

// Update a todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    
    await pool.query(
      'UPDATE todos SET completed = ? WHERE id = ?',
      [completed, id]
    );
    
    const [updatedTodo] = await pool.query(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );
    
    if (updatedTodo.length === 0) {
      const error = new Error('Todo not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.json(updatedTodo[0]);
  } catch (error) {
    next(error);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      'DELETE FROM todos WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      const error = new Error('Todo not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};
