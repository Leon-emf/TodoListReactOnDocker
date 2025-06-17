# TodoList with React, Node.js, and MySQL

This is a full-stack To-Do List application built with **React**, **Node.js**, and **MySQL**. It allows users to add, complete, and delete tasks in a clean and intuitive interface with data persistence.

## Features

- React frontend for a responsive UI
- Node.js/Express backend API
- MySQL database for data persistence
- Docker for easy setup and deployment
- CRUD operations for managing tasks

## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) (for local development outside of Docker)

## Setup and Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd TodoListReact
   ```

2. Start the application with Docker:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/todos

## Development

- Frontend code is in the `my-todo-app` directory
- Backend code is in the `backend` directory
- MySQL initialization script is in `mysql/init.sql`

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

Feel free to clone, modify, and extend it to fit your needs!

## Recommended Next Steps
- Use .env file to store sensitive information like database credentials.
