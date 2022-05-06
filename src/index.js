import { Keyboard } from './keyboard-init/keyboard.init';
import './styles/style.css';

const keyboard = new Keyboard();



window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('lang') === 'false') {
      keyboard.properties.en= false;
    }
    if (localStorage.getItem('lang') === 'true') {
      keyboard.properties.en = true;
    }
    keyboard.init();
    if (!keyboard.properties.en) {
      keyboard.initKeyboard([0]);
    } else {
      keyboard.initKeyboard([2]);
    }
    keyboard.realKeyboard()
  });