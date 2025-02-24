import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error-white.svg';
import okIcon from '../img/ok-icon.svg';

const form = document.querySelector('.form');
const createButton = form.querySelector('.create-button');
const inputs = form.querySelectorAll('input[name="state"]');
const fieldset = form.querySelector('.fieldset');

inputs.forEach(inp => {
  inp.addEventListener('change', () => {
    if (inp.checked) {
      fieldset.classList.add('fieldset-border');
    } else {
      fieldset.classList.remove('fieldset-border');
    }
  });
});

setTimeout(() => {
  iziToast.info({
    title: 'Hello',
    titleColor: '#fff',
    message: 'Welcome!',
    icon: 'far fa-bell',
    iconColor: '#fff',
    backgroundColor: '#09f',
    position: 'topRight',
    messageColor: '#fff',
  });
}, 1000);

form.addEventListener('submit', event => {
  event.preventDefault();

  const state = form.querySelector('input[name="state"]:checked').value;
  const delay = form.querySelector('.input-delay').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else if (state === 'rejected') {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.show({
        title: 'OK',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: `${message}`,
        messageSize: '16px',
        messageLineHeight: '1.5',
        messageColor: '#fff',
        color: '#59a10d',
        position: 'topRight',
        timeout: 5000,
        iconUrl: okIcon,
        iconColor: '#fafafb',
        theme: 'dark',
      });
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: `${error}`,
        messageSize: '16px',
        messageLineHeight: '1.5',
        messageColor: '#fff',
        color: '#ef4040',
        position: 'topRight',
        timeout: 5000,
        iconUrl: iconError,
        iconColor: '#fafafb',
        theme: 'dark',
      });
    });
});
