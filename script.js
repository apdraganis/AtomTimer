//  BUGS
// να μην κουνιουνται τα κουμπια

//  Progress Bar
progressDiv = document.querySelector(".progress-div");
barEl = document.querySelector(".progress-bar");

// read settings
customMode = false;

// save settings
settingsSaveBtn = document.querySelector("#settings-save-btn");
settingsSaveBtn.addEventListener('click', () => {
  customMode = true;
  settingsPomoVal = document.querySelector("#set-pomo").value;
  settingsSBreakVal = document.querySelector("#set-shortbreak").value;
  settingsLBreakVal = document.querySelector("#set-longbreak").value;
  settingsPomoCheckboxVal = document.querySelector("#auto-pomo-checkbox").checked;
  settingsBreakCheckboxVal = document.querySelector("#auto-break-checkbox").checked;
  settingsSoundVal = document.querySelector("#sound-pool").value;
  settingsVolumeVal = document.querySelector("#myRange").value;

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


// Function to color on mode change
function colorText(colorClass) {
  // change bg, link, sidenav arrow color
  document.querySelector("#me-link").className = `${colorClass}`;
  document.querySelector("#insta-link").className = `${colorClass}`;
  document.querySelector("#in-link").className = `${colorClass}`;
    // source links
    sourceLink = document.querySelectorAll(".source-link");
    for (i=0; i < sourceLink.length; i++) {
      if (sourceLink[i].className == 'source-link rTxt') {
        sourceLink[i].classList.remove('rTxt');
        sourceLink[i].classList.add(`${colorClass}`);
      } else if (sourceLink[i].className == 'source-link gTxt') {
        sourceLink[i].classList.remove('gTxt');
        sourceLink[i].classList.add(`${colorClass}`);
      } else if (sourceLink[i].className == 'source-link bTxt') {
        sourceLink[i].classList.remove('bTxt');
        sourceLink[i].classList.add(`${colorClass}`);
      } else {
      sourceLink[i].classList.add(`${colorClass}`);
      }
    }
    // document.querySelectorAll(".source-link").className = `${colorClass}`;
  
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