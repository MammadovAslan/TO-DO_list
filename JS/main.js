const addTaskInput = document.querySelector("#add_task_input");
const form = document.querySelector("form");
const main = document.querySelector("main");
const noTasks = document.querySelector("#no_tasks_added");
addTaskInput.addEventListener("focus", function () {
  this.value = "";
});

addTaskInput.addEventListener("blur", function () {
  this.value = "new task";
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  noTasks.classList.add("hide");
  const listItemDiv = document.createElement("div");
  listItemDiv.classList.add("list_item");

  const deleteTask = document.createElement("button");
  deleteTask.classList.add("delete_button");
  deleteTask.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteTask.addEventListener("click", () => {
    listItemDiv.remove();
  });

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("mark_task");

  const p = document.createElement("p");
  p.classList.add("task_description");
  p.innerHTML = addTaskInput.value[0].toUpperCase() + addTaskInput.value.slice(1);

  checkbox.addEventListener("change", function () {
    this.checked ? p.classList.add("done") : p.classList.remove("done");
  });
  addTaskInput.value = "";
  listItemDiv.append(deleteTask);
  listItemDiv.append(checkbox);
  listItemDiv.append(p);
  main.prepend(listItemDiv);
});

const clearButton = document.querySelector("#clear_button");
clearButton.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".list_item");
  tasks.forEach((task) => {
    task.remove();
  });
  noTasks.classList.replace("hide", "show");
});
