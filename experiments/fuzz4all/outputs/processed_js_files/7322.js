 
const eventMixin = {
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    this._eventHandlers[eventName] = handlers.filter(h => h !== handler);
  },
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) return;
    this._eventHandlers[eventName].forEach(handler => handler(...args));
  }
};

 
const delayIterable = {
  async *[Symbol.asyncIterator]() {
    for (let i = 1; i <= 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield i;
    }
  }
};

 
const app = Object.assign({
  async start() {
    for await (const number of delayIterable) {
      this.trigger('number', number);
    }
    this.trigger('done');
  }
}, eventMixin);

 
app.on('number', number => {
  print(`Number: ${number}`);
});

app.on('done', () => {
  print('Sequence complete!');
});

 
app.start();
