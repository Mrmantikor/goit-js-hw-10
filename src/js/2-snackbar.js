import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/icon-error.svg';
import okIcon from '../img/icon-ok.svg';
import bellIcon from '../img/icon-bell.svg';

const form = document.querySelector('.form');

if (!form) {
  console.error('Form element not found');
} else {
  const createButton = form.querySelector('.create-button');
  const inputs = form.querySelectorAll('input[name="state"]');
  const fieldset = form.querySelector('.fieldset');
  const delayInput = form.querySelector('.input-delay');

  inputs.forEach(inp => {
    inp.addEventListener('change', () => {
      fieldset.classList.toggle('fieldset-border', inp.checked);
    });
  });

  setTimeout(() => {
    iziToast.info({
      title: 'Hello',
      titleColor: '#fff',
      message: 'Welcome!',
      iconUrl: bellIcon,
      iconColor: '#fafafb',
      backgroundColor: '#09f',
      position: 'topRight',
      messageColor: '#fff',
    });
  }, 1000);

  form.addEventListener('submit', event => {
    event.preventDefault();

    const checkedInput = form.querySelector('input[name="state"]:checked');
    const delayValue = delayInput.value.trim();

    if (!checkedInput) {
      iziToast.warning({
        title: 'Warning',
        message: 'Будь ласка, виберіть стан промісу',
        position: 'topRight',
        color: '#ffa500',
      });
      return;
    }

    if (!delayValue || isNaN(delayValue) || Number(delayValue) < 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'Будь ласка, введіть коректну затримку (не відʼємне число)',
        position: 'topRight',
        color: '#ffa500',
      });
      return;
    }

    const state = checkedInput.value;
    const delay = Number(delayValue);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else if (state === 'rejected') {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then(delay => {
        iziToast.show({
          title: 'OK',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          message: `✅ Проміс виконано через ${delay}мс`,
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
      .catch(delay => {
        iziToast.show({
          title: 'Error',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          message: `❌ Проміс відхилено через ${delay}мс`,
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
}
