import { KEYBOARD_TEMPLATE } from './keyboard.template';

export class Keyboard {
  constructor() {
    this.body = document.querySelector('body');
    this.properties = {
      capsLock: false,
      en: false,
      shiftLeft: false,
      shiftRight: false
    };
    this.keyLayout = [
      ['`', '`', 'ё', 'Ё', 'Backquote'],
      ['1', '!', '1', '!', 'Digit1'],
      ['2', '@', '2', '"', 'Digit2'],
      ['3', '#', '3', '№', 'Digit3'],
      ['4', '$', '4', ';', 'Digit4'],
      ['5', '%', '5', '%', 'Digit5'],
      ['6', '^', '6', ':', 'Digit6'],
      ['7', '&', '7', '?', 'Digit7'],
      ['8', '*', '8', '*', 'Digit8'],
      ['9', '(', '9', '(', 'Digit9'],
      ['0', ')', '0', ')', 'Digit0'],
      ['-', '_', '-', '_', 'Minus'],
      ['=', '+', '=', '+', 'Equal'],
      ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
      ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
      ['q', 'Q', 'й', 'Й', 'KeyQ'],
      ['w', 'W', 'ц', 'Ц', 'KeyW'],
      ['e', 'E', 'у', 'У', 'KeyE'],
      ['r', 'R', 'к', 'К', 'KeyR'],
      ['t', 'T', 'е', 'Е', 'KeyT'],
      ['y', 'Y', 'н', 'Н', 'KeyY'],
      ['u', 'U', 'г', 'Г', 'KeyU'],
      ['i', 'I', 'ш', 'Ш', 'KeyI'],
      ['o', 'O', 'щ', 'Щ', 'KeyO'],
      ['p', 'P', 'з', 'З', 'KeyP'],
      ['[', '{', 'х', 'Х', 'BracketLeft'],
      [']', '}', 'ъ', 'Ъ', 'BracketRight'],
      ['\\', '|', '\\', '/', 'Backslash'],
      ['Delete', 'Delete', 'Delete', 'Delete', 'Delete'],
      ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
      ['a', 'A', 'ф', 'Ф', 'KeyA'],
      ['s', 'S', 'ы', 'Ы', 'KeyS'],
      ['d', 'D', 'в', 'В', 'KeyD'],
      ['f', 'F', 'а', 'А', 'KeyF'],
      ['g', 'G', 'п', 'П', 'KeyG'],
      ['h', 'H', 'р', 'Р', 'KeyH'],
      ['j', 'J', 'о', 'О', 'KeyJ'],
      ['k', 'K', 'л', 'Л', 'KeyK'],
      ['l', 'L', 'д', 'Д', 'KeyL'],
      [';', ':', 'ж', 'Ж', 'Semicolon'],
      ["'", '"', 'э', 'Э', 'Quote'],
      ['Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
      ['Shift', 'Shift', 'Shift', 'Shift', 'ShiftLeft'],
      ['z', 'Z', 'я', 'Я', 'KeyZ'],
      ['x', 'X', 'ч', 'Ч', 'KeyX'],
      ['c', 'C', 'с', 'С', 'KeyC'],
      ['v', 'V', 'и', 'М', 'KeyV'],
      ['b', 'B', 'и', 'И', 'KeyB'],
      ['n', 'N', 'т', 'Т', 'KeyN'],
      ['m', 'M', 'ь', 'Ь', 'KeyM'],
      [',', '<', 'б', 'Б', 'Comma'],
      ['.', '>', 'ю', 'Ю', 'Period'],
      ['/', '?', '.', ',', 'Slash'],
      ['&#8593', '&#8593', '&#8593', '&#8593', 'ArrowUp'],
      ['Shift', 'Shift', 'Shift', 'Shift', 'ShiftRight'],
      ['Control', 'Control', 'Control', 'Control', 'ControlLeft'],
      ['Alt', 'Alt', 'Alt', 'Alt', 'AltLeft'],
      ['Space', 'Space', 'Space', 'Space', 'Space'],
      ['Alt', 'Alt', 'Alt', 'Alt', 'AltRight'],
      ['&#8592', '&#8592', '&#8592', '&#8592', 'ArrowLeft'],
      ['&#8595', '&#8595', '&#8595', '&#8595', 'ArrowDown'],
      ['&#8594', '&#8594', '&#8594', '&#8594', 'ArrowRight'],
      ['Control', 'Control', 'Control', 'Control', 'ControlRight']
    ];
  }

  init() {
    this.body.insertAdjacentHTML('beforeend', KEYBOARD_TEMPLATE);
  }
  initKeyboard(languageKeyboard) {
    document.querySelector('.keyboard-keys').append(this.initKeys([languageKeyboard]));
  }
  initKeys(count) {
    const fragment = document.createDocumentFragment();

    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(key[4]) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('key');
      keyElement.setAttribute('data-key', `${key[4]}`);

      switch (key[4]) {
        case 'Backspace':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Backspace';
          keyElement.addEventListener('click', (event) => {
            this.deleteText(1, 0, 1);
          });

          break;
        case 'Delete':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Delete';
          keyElement.addEventListener('click', (event) => {
            this.deleteText(0, 1, 0);
          });
          break;

        case 'Tab':
          keyElement.classList.add('key-big');
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
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Control';
          break;
        case 'ControlRight':
          keyElement.classList.add('key-big');
          keyElement.innerHTML = 'Control';
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
          keyElement.innerHTML = '<span> </span>';
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
      if (insertLineBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  }
  insertText(text) {
    const textarea = document.querySelector('.use-keyboard-input');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const findText = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    textarea.value = findText;
    textarea.focus();
    textarea.selectionEnd = start == end ? end + text.length : end;
  }
  deleteText(num1, num2, num3) {
    const textarea = document.querySelector('.use-keyboard-input');
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
      if (!key.classList.contains('key-big') && !key.classList.contains('key-huge')) {
        if (this.properties.capsLock) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
  }
}
