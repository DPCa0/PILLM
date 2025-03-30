(async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const fetchRandomNumber = async () => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new');
    return res.text().then(Number);
  };

  class EventEmitter {
    constructor() {
      this.events = {};
    }
    on(event, listener) {
      (this.events[event] || (this.events[event] = [])).push(listener);
      return this;
    }
    emit(event, ...args) {
      (this.events[event] || []).slice().forEach(fn => fn(...args));
    }
  }

  const generateAndEmitRandomNumber = async (emitter) => {
    await delay(2000);  
    const randomNumber = await fetchRandomNumber();
    emitter.emit('newNumber', randomNumber);
  };

  const emitter = new EventEmitter();
  emitter.on('newNumber', num => print(`New random number generated: ${num}`));

   
  const state = new Proxy({ shouldFetch: true }, {
    set(target, prop, value) {
      if (prop === 'shouldFetch' && value) {
        generateAndEmitRandomNumber(emitter);
      }
      target[prop] = value;
      return true;
    }
  });

   
  const interval = setInterval(() => {
    if (!state.shouldFetch) clearInterval(interval);
  }, 5000);

   
  setTimeout(() => state.shouldFetch = false, 15000);
})();
