const express = require("express");
const app = express();
const PORT = 3000;

let todos = []; // store tasks in memory

// Middleware
app.use(express.json());
app.use(express.static("public")); // serve frontend files

// Routes
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  const newTodo = { id: Date.now(), task };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
