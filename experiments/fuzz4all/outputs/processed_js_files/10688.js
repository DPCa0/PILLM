 

 
const createObservable = obj => {
  const subscribers = new Set();

  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      subscribers.forEach(subscriber => subscriber());
      return true;
    },
    get(target, prop) {
      if (prop === 'subscribe') {
        return subscriber => subscribers.add(subscriber);
      }
      if (prop === 'unsubscribe') {
        return subscriber => subscribers.delete(subscriber);
      }
      return target[prop];
    }
  });
};

 
const createCounter = () => {
  const state = createObservable({ count: 0 });

   
  const actions = {
    increment() {
      state.count++;
    },
    decrement() {
      state.count--;
    },
    reset() {
      state.count = 0;
    }
  };

   
  state.subscribe(() => print(`Count: ${state.count}`));

  return { state, actions };
};

 
(async () => {
  const counter = createCounter();

   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  await delay(500);
  counter.actions.increment();

  await delay(500);
  counter.actions.increment();

  await delay(500);
  counter.actions.decrement();

  await delay(500);
  counter.actions.reset();
})();
