import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/icon-error.svg';
import okIcon from '../img/icon-ok.svg';
import bellIcon from '../img/icon-bell.svg';

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
    iconUrl: bellIcon,
    iconColor: '#fafafb',
  });
}, 1000);

form.addEventListener('submit', event => {
  event.preventDefault();

  const state = form.querySelector('input[name="state"]:checked')?.value;
  let delay = form.querySelector('.input-delay').value;

  delay = Number(delay);
  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      title: 'Error',
      message: 'Введіть коректне число для затримки!',
      position: 'topRight',
      timeout: 5000,
      iconUrl: iconError,
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        title: '✅ Успіх',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageSize: '16px',
        messageLineHeight: '1.5',
        message: `Завершено promise за ${delay}ms`,
        messageColor: '#fff',
        color: '#59a10d',
        position: 'topRight',
        timeout: 5000,
        iconUrl: okIcon,
        iconColor: '#fafafb',
        theme: 'dark',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌ Помилка',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageSize: '16px',
        messageLineHeight: '1.5',
        message: `Promise відхилено через ${delay}ms`,
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
