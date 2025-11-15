let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterBtns = document.querySelectorAll(".filter-btn");
const statsText = document.getElementById("statsText");

function addTodo() {
  const text = todoInput.value.trim(); // input value will be remove space in beginning and ending

  if (text === "") {
    todoInput.focus();
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo); // push Object todo
  saveTodos();
  todoInput.value = "";
  renderTodos();
  todoInput.focus();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id); // create new array without todo having id I want to delete
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos() {
  switch (currentFilter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

function updateStats() {
  const total = todos.length;
  const active = todos.filter((todo) => !todo.completed).length;
  const completed = todos.filter((todo) => todo.completed);

  if (total === 0) {
    statsText.textContent = "0 tasks";
  } else {
    statsText.textContent = `${total} total • ${active} active • ${completed} completed`;
  }
}

function renderTodos() {
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<div class="empty-state">No tasks to show</div>';
  } else {
    todoList.innerHTML = filteredTodos
      .map(
        (todo) => `
                    <li class="todo-item ${todo.completed ? "completed" : ""}">
                        <input 
                            type="checkbox" 
                            class="checkbox" 
                            ${todo.completed ? "checked" : ""}
                            onchange="toggleTodo(${todo.id})"
                        >
                        <span class="todo-text">${escapeHtml(todo.text)}</span>
                        <button class="delete-btn" onclick="deleteTodo(${
                          todo.id
                        })">Delete</button>
                    </li>
                `
      )
      .join("");
  }

  updateStats();
}

function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Event listeners
        addBtn.addEventListener('click', addTodo);

        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTodos();
            });
        });

        // Initial render
        renderTodos();