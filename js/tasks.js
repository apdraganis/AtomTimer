// TASKS
if (localStorage.getItem("tasks") !== null) {
  storedTasks = JSON.parse(localStorage.getItem("tasks")); // retrive stored tasks as array of strings
  tasksExist = true;
  for (i=0; i < storedTasks.length; i++) {                 // display stored tasks on the page
    displayTask(i)
  } 

} else {
  console.log('No tasks found!')
}

// Functions
function displayTask (i) {
  newLi = document.createElement("li");
  newLi.className = "task-li";
  taskPar = document.createElement("p");
  taskPar.textContent = storedTasks[i]
  newLi.appendChild(taskPar);
  styleTask();
  document.getElementById("task-ul").appendChild(newLi);
}

function addTask () {
  
  taskInputVal = document.getElementById("task-inp").value;
  if (taskInputVal === '') {
    alert("Add a task!")
  } else {
  // create li element
  newLi = document.createElement("li");
  taskPar = document.createElement("p");
  taskPar.textContent = taskInputVal;
  newLi.className = "task-li";
  newLi.appendChild(taskPar);
  styleTask()
  document.getElementById("task-ul").appendChild(newLi);
  
  // save task
  saveTask()
  

  
  }
  document.getElementById('task-inp').value = "";
}

function styleTask() {
  // add delete btn
  minusIcon = document.createElement("i");
  minusIcon.className = "fas fa-minus-circle deleteTask";
  minusIcon.setAttribute("onclick", "deleteTask(this)");
  newLi.appendChild(minusIcon);
  
  // add task arrow
  arrowIcon = document.createElement("i");
  arrowIcon.className = "fas fa-caret-right";
  taskPar.before(arrowIcon);
}

function saveTask() {
  if (localStorage.getItem('tasks') !== null) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
    tasksArray.push(taskInputVal);
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
  } else {
    tasksArray = [];
    tasksArray.push(taskInputVal);
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
  }
}

function deleteTask(task) {            // inside this function, task refers to the i element
  task.parentElement.remove();
  task.parentElement.textContent;        // need to get the string of the task that I want to delete
  storedTasks = JSON.parse(localStorage.getItem("tasks"));   // retrive stored tasks as array of strings
  taskIndex = storedTasks.indexOf(task.parentElement.textContent)
  storedTasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(storedTasks))
}

// add task by pressing enter
taskInput = document.querySelector("#task-inp");
taskInput.addEventListener('keydown', () => {
  if (event.keyCode === 13) {
    addTask()
  };
})