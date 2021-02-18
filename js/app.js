const _days = document.getElementById('days');
const _hrs = document.getElementById('hours');
const _mins = document.getElementById('minutes');
const _secs = document.getElementById('seconds');
const userTime = new Date();

function countDownTimer() {
  const isCountInit = JSON.parse(localStorage.getItem('initTimer'));
  if (isCountInit == null) return countDown(init());
  else return countDown(isCountInit.initValues);
}

function init() {
  const initValues = {
    day: 1,
    hr: userTime.getHours(),
    min: userTime.getMinutes(),
    sec: userTime.getSeconds(),
  };
  localStorage.setItem(
    'initTimer',
    JSON.stringify({
      init: true,
      initValues,
    }),
  );
  setValues(formatValues(initValues));
  return initValues;
}

function setValues(values) {
  _days.firstChild.textContent = values.day;
  _hrs.firstChild.textContent = values.hr;
  _mins.firstChild.textContent = values.min;
  _secs.firstChild.textContent = values.sec;
}

function formatValues(values) {
  let day = String(values.day).length < 2 ? `0${values.day}` : values.day;
  let hr = String(values.hr).length < 2 ? `0${values.hr}` : values.hr;
  let min = String(values.min).length < 2 ? `0${values.min}` : values.min;
  let sec = String(values.sec).length < 2 ? `0${values.sec}` : values.sec;
  return {
    day,
    hr,
    min,
    sec,
  };
}

function countDown(values) {
  let { day, hr, min, sec } = values;

  if (sec != 0) {
    sec--;
   
  } else {
    sec = 59;
    if (min != 0) {
      min--;
    } else {
      min = 59;
      if (hr != 0) {
        hr--;
      } else {
        hr = 59;
        if (day != 0) {
          day--;
        } else {
          day = 0;
          finished();
        }
      }
    }
  }
  let countDownValues = {
    day,
    hr,
    min,
    sec,
  };
  localStorage.setItem(
    'initTimer',
    JSON.stringify({ init: true, initValues: countDownValues }),
  );
  setValues(formatValues(countDownValues));
}
const start = setInterval(countDownTimer, 1000);
function finished() {
  clearInterval(start);
  setValues(
    formatValues(JSON.parse(localStorage.getItem('initTimer')).initValues),
  );
}
