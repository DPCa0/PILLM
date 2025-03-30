class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: 2px solid black;
          padding: 10px;
          margin: 10px;
        }
      </style>
      <slot></slot>
    `;
  }
}

window.customElements.define('custom-element', CustomElement);

const asyncOperation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print('Async operation completed');
      resolve();
    }, 1000);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();
  
  const listener = debounce(async (message) => {
    print(`Received event: ${message}`);
    await asyncOperation();
  }, 300);

  eventEmitter.on('customEvent', listener);
  eventEmitter.emit('customEvent', 'Hello, world!');

  const customElementInstance = document.createElement('custom-element');
  customElementInstance.innerHTML = '<p>This is a custom element with shadow DOM</p>';
  document.body.appendChild(customElementInstance);
})();
