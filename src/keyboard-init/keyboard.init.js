import { ARRAY_KEYS } from './constants';
import { KEYBOARD_TEMPLATE } from './keyboard.template';

export class Keyboard {
  constructor() {
    this.properties = {
      capsLock: false,
      en: false,
      shiftLeft: false,
      shiftRight: false
    };
    this.keyLayout = ARRAY_KEYS;
  }

  init() {
    document.querySelector('body').insertAdjacentHTML('beforeend', KEYBOARD_TEMPLATE);
  }

  initKeyboard(languageKeyboard) {
    document.querySelector('.keyboard-keys').append(this.initKeys([languageKeyboard]));
    if (this.properties.en === false) {
      localStorage.setItem('lang', 'false');
    }
    if (this.properties.en === true) {
      localStorage.setItem('lang', 'true');
    }
  }

  initKeys(count) {
    const fragment = document.createDocumentFragment();
    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const rightBorder = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(key[4]) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('key');
      keyElement.setAttribute('data-key', `${key[4]}`);

      switch (key[4]) {
        case 'Backspace':
          keyElement.classList.add('key-little-big');
          keyElement.innerHTML = 'Backspace';
          keyElement.addEventListener('click', (event) => {
            this.deleteText(1, 0, 1);
          });

          break;
        case 'Delete':
          keyElement.classList.add('key-small');
          keyElement.innerHTML = 'Del';
          keyElement.addEventListener('click', (event) => {
            this.deleteText(0, 1, 0);
          });
          break;

        case 'Tab':
          keyElement.classList.add('key-small');
          keyElement.innerHTML = 'Tab';
          keyElement.addEventListener('click', (event) => {
            this.insertText('\t');
          });
          break;

        case 'CapsLock':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'CapsLock';
          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('active');
            this.toggleCapsLock();
          });
          break;

        case 'Enter':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Enter';
          keyElement.addEventListener('click', (event) => {
            this.insertText('\n');
          });
          break;

        case 'ShiftLeft':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Shift';
          if (this.properties.shiftLeft) {
            keyElement.classList.add('active');
            this.properties.shiftLeft = !this.properties.shiftLeft;
          }
          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('active');
            if (keyElement.classList.contains('active')) {
              this.properties.shiftLeft = !this.properties.shiftLeft;
              document.querySelector('.keyboard-keys').innerHTML = '';
              if (!this.properties.en) {
                this.initKeyboard([1]);
              } else {
                this.initKeyboard([3]);
              }
            } else {
              document.querySelector('.keyboard-keys').innerHTML = '';
              if (!this.properties.en) {
                this.initKeyboard([0]);
              } else {
                this.initKeyboard([2]);
              }
            }
          });
          break;

        case 'ShiftRight':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Shift';
          if (this.properties.shiftRight) {
            keyElement.classList.add('active');
            this.properties.shiftRight = !this.properties.shiftRight;
          }
          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('active');
            if (keyElement.classList.contains('active')) {
              this.properties.shiftRight = !this.properties.shiftRight;
              document.querySelector('.keyboard-keys').innerHTML = '';
              if (!this.properties.en) {
                this.initKeyboard([1]);
              } else {
                this.initKeyboard([3]);
              }
            } else {
              document.querySelector('.keyboard-keys').innerHTML = '';
              if (!this.properties.en) {
                this.initKeyboard([0]);
              } else {
                this.initKeyboard([2]);
              }
            }
          });
          break;

        case 'ControlLeft':
          keyElement.classList.add('key-small');
          keyElement.innerHTML = 'Ctrl';
          break;

        case 'ControlRight':
          keyElement.classList.add('key-small');
          keyElement.innerHTML = 'Ctrl';
          break;

        case 'AltRight':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Alt';
          break;

        case 'AltLeft':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Alt';
          keyElement.addEventListener('click', () => {
            if (document.querySelector('[data-key="ShiftLeft"]').classList.contains('active')) {
              this.properties.en = !this.properties.en;
              document.querySelector('.keyboard-keys').innerHTML = '';
              if (!this.properties.en) {
                this.initKeyboard([0]);
              } else {
                this.initKeyboard([2]);
              }
            }
          });
          break;

        case 'Space':
          keyElement.classList.add('key-huge');
          keyElement.innerHTML = 'Space';
          keyElement.addEventListener('click', (event) => {
            this.insertText(' ');
          });
          break;

        default: {
          keyElement.innerHTML = key[`${count}`];
          keyElement.addEventListener('click', (event) => {
            this.insertText(event.target.innerHTML);
          });
          break;
        }
      }
      fragment.append(keyElement);
      if (rightBorder) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  }

  insertText(text) {
    const textarea = document.querySelector('.input-keyboard');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const findText = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    textarea.value = findText;
    textarea.focus();
    textarea.selectionEnd = start == end ? end + text.length : end;
  }

  deleteText(num1, num2, num3) {
    const textarea = document.querySelector('.input-keyboard');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const findText = textarea.value.substring(0, start - num1) + textarea.value.substring(end + num2);
    textarea.value = findText;
    textarea.selectionEnd = start == end ? end - num3 : end;
    textarea.focus();
  }

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    document.querySelectorAll('.key').forEach((key) => {
      if (
        !key.classList.contains('key-big') &&
        !key.classList.contains('key-little-big') &&
        !key.classList.contains('key-huge') &&
        !key.classList.contains('key-small')
      ) {
        if (this.properties.capsLock) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
  }

  realKeyboard() {
    document.addEventListener('keydown', (event) => {
      const key = document.querySelector(`button[data-key='${event.code}']`);
      event.preventDefault();
      switch (event.code) {
        case 'Backspace':
          this.deleteText(1, 0, 1);
          break;

        case 'Delete':
          this.deleteText(0, 1, 0);
          break;

        case 'Tab':
          this.insertText('\t');
          break;

        case 'CapsLock':
          this.toggleCapsLock();
          key.classList.toggle('active');
          break;

        case 'Enter':
          this.insertText('\n');
          break;

        case 'ShiftLeft':
          key.classList.add('active');
          this.properties.shiftLeft = !this.properties.shiftLeft;
          document.querySelector('.keyboard-keys').innerHTML = '';
          if (!this.properties.en) {
            this.initKeyboard([1]);
          } else {
            this.initKeyboard([3]);
          }
          break;

        case 'ShiftRight':
          key.classList.add('active');
          this.properties.shiftRight = !this.properties.shiftRight;
          document.querySelector('.keyboard-keys').innerHTML = '';
          if (!this.properties.en) {
            this.initKeyboard([1]);
          } else {
            this.initKeyboard([3]);
          }
          break;

        case 'ControlLeft':
        case 'ControlRight':
        case 'AltLeft':
        case 'AltRight':
          break;

        case 'Space':
          this.insertText(' ');
          break;

        default:
          this.insertText(key.innerHTML);
          break;
      }

      key.classList.add('active');
    });

    document.addEventListener('keyup', (event) => {
      const key = document.querySelector(`button[data-key='${event.code}']`);
      if (event.code === 'CapsLock') {
        this.toggleCapsLock();
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        document.querySelector('.keyboard-keys').innerHTML = '';
        if (!this.properties.en) {
          this.initKeyboard([0]);
        } else {
          this.initKeyboard([2]);
        }
      }
      key.classList.remove('active');
    });

    function changeLanguage(func, ...codes) {
      const pressed = new Set();

      document.addEventListener('keydown', (event) => {
        pressed.add(event.code);

        // Are all keys from the set pressed?
        for (let i = 0; i < codes.length; i += 1) {
          if (!pressed.has(codes[i])) {
            return;
          }
        }

        pressed.clear();
        func();
      });

      document.addEventListener('keyup', (event) => {
        pressed.delete(event.code);
      });
    }

    changeLanguage(
      () => {
        setTimeout(() => {
          this.properties.en = !this.properties.en;
          document.querySelector('.keyboard-keys').innerHTML = '';
          if (this.properties.en) {
            this.initKeyboard([0]);
          } else {
            this.initKeyboard([2]);
          }
        }, 100);
      },
      'ShiftLeft',
      'AltLeft'
    );
  }
}
