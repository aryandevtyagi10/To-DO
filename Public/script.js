const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("todoList");

// Fetch existing todos
async function loadTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();
  list.innerHTML = "";
  todos.forEach(todo => addTodoToDOM(todo));
}

// Add todo to DOM
function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.textContent = todo.task;

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = async () => {
    await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
    loadTodos();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });

  input.value = "";
  loadTodos();
});

// Initial load
loadTodos();
