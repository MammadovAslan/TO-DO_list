const addTaskInput = document.querySelector("#add_task_input");
const form = document.querySelector("form");
const tasksContainer = document.querySelector("#list_items");
const noTasks = document.querySelector("#no_tasks_added");
const clearButton = document.querySelector("#clear_button");

let data = [];
//*---------------------Clear list and storage----------------------
clearButton.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".list_item");
  tasks.forEach((task) => {
    task.remove();
  });
  localStorage.clear();
  data = [];
});

//*---------------------Local Storage Events----------------------

//*---------------------Add data from storage to page----------------------
if (localStorage.getItem("data")) {
  data = JSON.parse(localStorage.getItem("data"));

  for (let i = 0; i < data.length; i++) {
    tasksContainer.innerHTML += data[i].html;
  }

  let divs = [...tasksContainer.querySelectorAll(".list_item")];
  let checks = tasksContainer.querySelectorAll("input[type=checkbox]");

  //*---------------------Delete_button----------------------

  divs.forEach((div) => {
    div.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete_button")) {
        let id = divs.lastIndexOf(div);
        this.remove();
        divs.splice(id, 1);
        data.splice(id, 1);
        localStorage.setItem("data", JSON.stringify(data));
      }
    });
  });

  //*---------------------Save checked task---------------------

  checks.forEach((check, index) => {
    let p = check.nextElementSibling;
    if (JSON.parse(localStorage.getItem("data"))[index].checked) {
      check.setAttribute("checked", true);
      p.classList.add("done");
    } else {
      check.removeAttribute("checked");
      p.classList.remove("done");
    }

    check.addEventListener("click", function () {
      if (this.checked) {
        p.classList.add("done");
        data[index].checked = true;
      } else {
        p.classList.remove("done");
        data[index].checked = false;
      }
      localStorage.setItem("data", JSON.stringify(data));
    });
  });
}

//-------------------------------------------------------------------
//*-------------------------Add new task event-----------------------
let listDivs = [];
let listChecks = [];
let count = 0;
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (addTaskInput.value.trim() !== "" && addTaskInput.value.trim() !== "new task") {
    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("list_item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("mark_task");

    const p = document.createElement("p");
    p.classList.add("task_description");
    p.innerHTML = addTaskInput.value[0].toUpperCase() + addTaskInput.value.slice(1);

    //*------------------------Mark checked tasks------------------------------------
    checkbox.addEventListener("click", function () {
      let id = listChecks.lastIndexOf(checkbox);
      if (this.checked) {
        p.classList.add("done");
        data[id].checked = true;
      } else {
        p.classList.remove("done");
        data[id].checked = false;
      }
      localStorage.setItem("data", JSON.stringify(data));
    });

    const deleteTask = document.createElement("i");
    deleteTask.classList.add("delete_button");
    deleteTask.classList.add("fa-solid");
    deleteTask.classList.add("fa-trash");

    //*---------------------Remove new tasks(before reload)----------------------

    deleteTask.addEventListener("click", () => {
      let idDiv = listDivs.lastIndexOf(listItemDiv);
      let idCheck = listChecks.lastIndexOf(checkbox);
      data.splice(idDiv, 1);
      listDivs.splice(idDiv, 1);
      listChecks.splice(idCheck, 1);
      listItemDiv.remove();
      localStorage.setItem("data", JSON.stringify(data));
    });

    addTaskInput.value = "";
    count++;

    listItemDiv.append(deleteTask);
    listItemDiv.append(checkbox);
    listItemDiv.append(p);
    tasksContainer.prepend(listItemDiv);

    listDivs.unshift(listItemDiv);
    listChecks.unshift(checkbox);

    saveData(listItemDiv, count);
  }
});
addTaskInput.addEventListener("focus", function () {
  this.value = "";
});

//*-----------------Save tasks to localStorage------------------------

function saveData(div, id) {
  let element = div.outerHTML;
  let obj = { html: element, checked: false, id: id };
  data.unshift(obj);
  localStorage.setItem("data", JSON.stringify(data));
}
