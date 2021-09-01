//  BUGS
// να μην κουνιουνται τα κουμπια

//  Progress Bar
progressDiv = document.querySelector(".progress-div");
barEl = document.querySelector(".progress-bar");

// read settings
let customMode = false;
settingsPomoInp = document.querySelector("#set-pomo");
settingsSBreakInp = document.querySelector("#set-shortbreak");
settingsLBreakInp = document.querySelector("#set-longbreak");
settingsPomoCheckbox = document.querySelector("#auto-pomo-checkbox");
settingsBreakCheckbox = document.querySelector("#auto-break-checkbox");
settingsSoundSelect = document.querySelector("#sound-pool");
settingsVolumeSlider = document.querySelector("#myRange");

// save settings
settingsSaveBtn = document.querySelector("#settings-save-btn");
settingsSaveBtn.addEventListener('click', () => {
  customMode = true;
  settingsPomoVal = settingsPomoInp.value;
  settingsSBreakVal = settingsSBreakInp.value;
  settingsLBreakVal = settingsLBreakInp.value;
  settingsPomoCheckboxVal = settingsPomoCheckbox.checked;
  settingsBreakCheckboxVal = settingsBreakCheckbox.checked;
  settingsSoundVal = settingsSoundSelect.value;
  settingsVolumeVal = settingsVolumeSlider.value;

  // check for invalid numbers on custom inputs
  if (settingsPomoVal <= 0 || settingsSBreakVal <= 0 || settingsLBreakVal <= 0) {
    settingsPomoVal = 45;
    settingsSBreakVal = 15;
    settingsLBreakVal = 30;
    alert('Something went wrong');
    return;
  }

  // set pomodoro menu by default
  mode = "pomo";
  resetTimer(mode);
  timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
  // change bg,link,sidenav arrow color
  colorBg('rBg')
  colorText('rTxt')

  // set audio
  setAudio();
  setVolume();
});


// audio and volume
audio = new Audio('./audio/bell.mp3'); // default audio
function setAudio() {
  if (settingsSoundVal == 'bell') {
    audio = new Audio('./audio/bell.mp3');
  } else if (settingsSoundVal == 'bird') {
    audio = new Audio('./audio/bird.mp3');
  } else if (settingsSoundVal == 'horn') {
    audio = new Audio('./audio/horn.mp3');
  };
}

function setVolume() {
 audio.volume = settingsVolumeVal / 100
}


// var audio = new Audio('audio_file.mp3');
// audio.play();8


// Countdown timer
let startstopBtn = document.querySelector("#start-btn");
let counter = 0; // change this for test sessions
let timerEl = document.querySelector(".timer");
let mode = "pomo";
colorBg('rBg');
colorText('rTxt');
let running = false;
timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
let interval ;

startstopBtn.addEventListener('click', () => {
  if (running == false) {
    interval = setInterval(countDown, 1000)
    running = true;
    setStartStopBtn();
  } else {
    customClearInterval();
  }
  
});

function convertSeconds(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

function countDown() {
  counter ++;
  timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
  if (counter === timeLeft) {

    audio.play();
    customClearInterval();
    counter = 0;

    // switch mode automatically after end of session
    if (mode == 'pomo') {
      mode = 'short-break';
      colorBg('gBg');
      colorText('gTxt');
    } else if (mode == 'short-break') {
      mode = 'pomo';
      colorBg('rBg');
      colorText('rTxt');
    }
    setTimeLeft(mode);
    timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);

    // start counting automatically if enabled from settings
    if (settingsPomoCheckboxVal == true) {
      if (mode == 'pomo') {
        interval = setInterval(countDown, 1000)
        running = true;
        setStartStopBtn();
      }
    }
    if (settingsBreakCheckboxVal == true) {
      if (mode == 'short-break') {
        interval = setInterval(countDown, 1000)
        running = true;
        setStartStopBtn();
      };
    };
  };

  // progress bar
  barEl.style.width = `${100 - ( (timeLeft - counter) * (100/timeLeft) )}%`

};

// Pomodoro - Short Break - Long Break option
let pomodoroBtn = document.querySelector("#pomo-btn");
let shortBreakBtn = document.querySelector("#short-break-btn");
let longBreakBtn = document.querySelector("#long-break-btn");

pomodoroBtn.addEventListener('click', () => {
  mode = "pomo";
  resetTimer(mode);
  timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
  // change bg,link,sidenav arrow color
  colorBg('rBg')
  colorText('rTxt')
  
});
shortBreakBtn.addEventListener('click', () => {
  mode = "short-break";
  resetTimer(mode);
  timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
  // change bg,link,sidenav arrow color
  colorBg('gBg')
  colorText('gTxt')
})
longBreakBtn.addEventListener('click', () => {
  mode = "long-break";
  resetTimer(mode)
  timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
  // change bg,sideav arrow color
  colorBg('bBg')
  colorText('bTxt')
})

function resetTimer(mode) {
  customClearInterval();
  counter = 0;
  setTimeLeft(mode);
}

function setTimeLeft(mode) {
  if (customMode) {
    if (mode == "pomo") {
      return timeLeft = parseInt(settingsPomoVal)*60;
    } else if (mode == "short-break") {
      return timeLeft = parseInt(settingsSBreakVal)*60;
    } else if (mode == "long-break") {
      return timeLeft = parseInt(settingsLBreakVal)*60;
    }
  } else {
    if (mode == "pomo") {
      return timeLeft = (45 * 60);
    } else if (mode == "short-break") {
      return timeLeft = 15 * 60;
    } else if (mode == "long-break") {
      return timeLeft = 30 * 60;
    }
  }
};

//  end btn
let endBtn = document.querySelector("#end-btn");
endBtn.addEventListener('click', () => {
  resetTimer(mode);
  timerEl.textContent = convertSeconds(setTimeLeft(mode) - counter);
});

// stop btn
function setStartStopBtn(){ 
  if (running) {
    startstopBtn.textContent = "Stop";
  } else {
    startstopBtn.textContent = "Start";
  }
}

// custom clear interval
function customClearInterval() {
  running = false;
  clearInterval(interval);
  setStartStopBtn();
}





// scroll when click about arrow
let aboutArrow = document.querySelector('#about-arrow');
aboutArrow.addEventListener('click', () => {
  window.scrollBy(0, window.innerHeight);
});


// TASKS
if (localStorage.getItem("tasks") !== null) {
  console.log('Tasks found!')
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

function deleteTask(task) {                            // inside this function, task refers to the i element
  task.parentElement.remove();
  task.parentElement.textContent;                     // need to get the string of the task that I want to delete
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


// Sidenav
/* Open the sidenav */
function openNav() {
  if (window.innerWidth > 500) {
    document.getElementById("mySidenav").style.width = "250px";
  } else {
    document.getElementById("mySidenav").style.width = "100%";
  }

  setTimeout( () => {
    document.querySelector(".sidenav-settings").style.display = "flex";
  }, 280)

}

/* Close/hide the sidenav */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector(".sidenav-settings").style.display = "none";
}


// Function to color on mode change
function colorText(colorClass) {
  // change bg, link, sidenav arrow color
  document.querySelector("#me-link").className = `${colorClass}`;
  document.querySelector("#insta-link").className = `${colorClass}`;
  document.querySelector("#in-link").className = `${colorClass}`;
  document.querySelector("#wiki-link").className = `${colorClass}`;
  
  infoHeadings = document.querySelectorAll('#heading');
  for (i=0; i < infoHeadings.length; i++) {
    infoHeadings[i].className = `${colorClass}`;
  }

  settingsTitle = document.querySelectorAll(".settings-title");
  for (i=0; i < settingsTitle.length; i++) {
    if (settingsTitle[i].className == 'settings-title rTxt') {
      settingsTitle[i].classList.remove('rTxt');
      settingsTitle[i].classList.add(`${colorClass}`);
    } else if (settingsTitle[i].className == 'settings-title gTxt') {
      settingsTitle[i].classList.remove('gTxt');
      settingsTitle[i].classList.add(`${colorClass}`);
    } else if (settingsTitle[i].className == 'settings-title bTxt') {
      settingsTitle[i].classList.remove('bTxt');
      settingsTitle[i].classList.add(`${colorClass}`);
    } else {
    settingsTitle[i].classList.add(`${colorClass}`);
    }
  }
};

function colorBg(colorClass) {
  document.body.className = `${colorClass}`;
}


