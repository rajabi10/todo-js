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
  saveLocalTodo(newTodo)
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
    removeLocalTodo(todo)
    todo.remove();
  }
  if (item.classList[0] === "complete-btn"){
      const todo = item.parentElement;
      todo.classList.toggle("completed")
  }
}