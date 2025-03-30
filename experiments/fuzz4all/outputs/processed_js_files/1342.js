 

class ReactiveHandler {
  constructor(target) {
    this.callbacks = new Map();

    return new Proxy(target, {
      get: (obj, prop) => {
        return obj[prop];
      },
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (this.callbacks.has(prop)) {
          for (const cb of this.callbacks.get(prop)) {
            cb(value);
          }
        }
        return true;
      }
    });
  }

  subscribe(prop, callback) {
    if (!this.callbacks.has(prop)) {
      this.callbacks.set(prop, []);
    }
    this.callbacks.get(prop).push(callback);
  }
}

function* valueGenerator(initialValue) {
  let currentValue = initialValue;
  while (true) {
    currentValue = yield currentValue;
  }
}

async function asyncProcessor(generator, reactive, prop) {
  let gen = generator.next();
  while (!gen.done) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    reactive[prop] = gen.value;
    gen = generator.next(gen.value + 1);
  }
}

const data = { number: 0 };
const reactiveData = new ReactiveHandler(data);

reactiveData.subscribe('number', (newValue) => {
  print(`Reactive number updated: ${newValue}`);
});

const generator = valueGenerator(0);
asyncProcessor(generator, reactiveData, 'number');

 
