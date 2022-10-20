const addTaskInput = document.querySelector("#add_task_input");
const form = document.querySelector("form");
const tasksContainer = document.querySelector("#list_items");
const noTasks = document.querySelector("#no_tasks_added");

const clearButton = document.querySelector("#clear_button");
clearButton.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".list_item");
  tasks.forEach((task) => {
    task.remove();
  });
  if (tasksContainer.childNodes.length !== 0) {
    clearButton.style.display = "block";
    noTasks.style.display = "none";
  } else {
    clearButton.style.display = "none";
    noTasks.style.display = "block";
  }
});
clearButton.style.display = "none";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (addTaskInput.value.trim() !== "" && addTaskInput.value.trim() !== "new task") {
    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("list_item");

    const deleteTask = document.createElement("i");
    deleteTask.classList.add("delete_button");
    deleteTask.classList.add("fa-solid");
    deleteTask.classList.add("fa-trash");

    deleteTask.addEventListener("click", () => {
      listItemDiv.remove();
      if (tasksContainer.childNodes.length !== 0) {
        clearButton.style.display = "block";
        noTasks.style.display = "none";
      } else {
        clearButton.style.display = "none";
        noTasks.style.display = "block";
      }
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
    tasksContainer.prepend(listItemDiv);
    console.log();
  }
  if (tasksContainer.childNodes.length !== 0) {
    clearButton.style.display = "block";
    noTasks.style.display = "none";
  } else {
    clearButton.style.display = "none";
    noTasks.style.display = "block";
  }
});
addTaskInput.addEventListener("focus", function () {
  this.value = "";
});

addTaskInput.addEventListener("blur", function () {
  this.value = "new task";
});
