class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
  }
  
  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }
  
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const stateHandler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop}: ${Reflect.get(...arguments)}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target.observable.notify({[prop]: value});
    return Reflect.set(...arguments);
  }
};

function reactiveState(initialState) {
  const observable = new Observable();
  const proxy = new Proxy(initialState, stateHandler);
  proxy.observable = observable;
  return proxy;
}

const state = reactiveState({count: 0, text: 'Hello'});

state.observable.subscribe((change) => {
  print('State changed:', change);
});

state.count = 1;
state.text = 'Advanced JavaScript!';
print(state.count);
print(state.text);
