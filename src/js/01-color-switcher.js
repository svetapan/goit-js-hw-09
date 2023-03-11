const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStoptClick);

function onBtnStartClick() {
    timerId = setInterval(() => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        body.style.background = randomColor;
        btnStart.setAttribute('disabled', true);
        btnStop.removeAttribute('disabled');
    }, 1000);
};

function onBtnStoptClick() {
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
};