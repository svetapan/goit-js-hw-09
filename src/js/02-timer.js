import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let timerId = null;
let timeDifference = 0;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      currentDifferenceDate(selectedDates[0]);
    },
};

startBtn.setAttribute('disabled', true);

flatpickr(inputDate, options);

startBtn.addEventListener('click', onStartBtnClick);

function  onStartBtnClick() {
    timerId = setInterval(onstartTimer, 1000)
};

function onstartTimer() {
    startBtn.setAttribute('disabled', true);

    timeDifference -= 1000;

    if (secondsValue.textContent === 0 && minutesValue.textContent === 0) {
        Notify.success('Time end');
        clearInterval(timerId);
    } else {
        formatDate = convertMs(timeDifference);
        recreateDate(formatDate);
    }
};


function currentDifferenceDate(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates < currentDate) {
       startBtn.setAttribute('disabled', true);
       return Notify.failure('Please choose a date in the future');
    } else {
        timeDifference = selectedDates.getTime() - currentDate;
        formatDate = convertMs(timeDifference);
        recreateDate(formatDate);
        startBtn.removeAttribute('disabled');
    }
}

function recreateDate(formatDate) {
    secondsValue.textContent = formatDate.seconds;
    minutesValue.textContent = formatDate.minutes;
    hoursValue.textContent = formatDate.hours;
    daysValue.textContent = formatDate.days;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

window.addEventListener('keydown', evt => {
    if (evt.code === 'Eskape' && timerId) {
        clearInterval(timerId);

        secondsValue.textContent = '00';
        minutesValue.textContent = '00';
        hoursValue.textContent = '00';
        daysValue.textContent = '00';
    }
})