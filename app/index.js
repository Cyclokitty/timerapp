const moment = require('moment');
const {ipcRenderer} = require('electron');

const secondsToTime = (s) => {
  let momentTime = moment.duration(s, 'seconds');
  let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
  let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
  return `${min}:${sec}`;
};

// initial time, hardcoded
//let currentTime = 255;

// using ipcRenderer to listen to the timer-change event
ipcRenderer.on('timer-change', (event, t) => {
  // initialize time with value send with event
  let currentTime = t;

  // print out hte time
  timerDiv.innerHTML = secondsToTime(currentTime);

  // execute every second
  let timer = setInterval(() => {
    // remove one second
    currentTime = currentTime - 1;
    // print ou the time
    timerDiv.innerHTML = secondsToTime(currentTime);
    // when it reaches 0, stop
    if (currentTime <= 0) {
      clearInterval(timer);
      timerDiv.innerHTML = 'Boom! Time\'s Up!';
    }
  }, 1000);
});
