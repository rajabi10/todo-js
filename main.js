const input = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todobutton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

//create todo list and save it to localStorage
function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = input.value;
  saveLocalTodo(input.value);
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);
  input.value = "";

  const completedbtn = document.createElement("button");
  completedbtn.innerHTML = "<i class= 'fas fa-check'></i>";
  completedbtn.classList.add("complete-btn");
  todoDiv.appendChild(completedbtn);
  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = "<i class= 'fas fa-trash'></i>";
  deletebtn.classList.add("trash-btn");
  todoDiv.appendChild(deletebtn);

  todoList.appendChild(todoDiv);
}

// delete and complete todo and remove from localStorage
function deleteCompleteTodo(event) {
  console.log(event.target);
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodo(todo);
    todo.remove();
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filter function that can filter completed and uncompleted todos
function filterTodo(event) {
  const todo = todoList.childNodes;
  todo.forEach(function (todo) {
    switch (event.target.value) {
      case "All":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

//save to localStorage
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//remove from localStorage
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//get todo list when run for the first time if it has a todo
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class=' fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("buttn");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}
