import { Keyboard } from './keyboard-init/keyboard.init';
import './styles/style.css';

const keyboard = new Keyboard();

keyboard.init();
if (!keyboard.properties.en) {
  keyboard.initKeyboard([0]);
} else {
  keyboard.initKeyboard([2]);
}
