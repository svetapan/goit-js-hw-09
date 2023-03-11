import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[ name="step"]');
const position = document.querySelector('input[ name="amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  let intervaldelay = Number(delay.value);

  for (let i = 1; i <= position.value; i += 1) {
    createPromise(i, intervaldelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    intervaldelay += Number(step.value);
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay)
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });