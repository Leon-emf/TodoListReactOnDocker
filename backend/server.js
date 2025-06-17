const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('<h1>API TodoList is running!</h1><p>Visit <a href="/api/todos">/api/todos</a> to see the todo list.</p>');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'an error occurred', error: err.message });
});

app.listen(PORT, () => {
    console.log(`port : ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});
