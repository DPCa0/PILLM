class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, handler) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(handler);
    return () => this.events[event].delete(handler);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(data));
    }
  }
}

class Store extends PubSub {
  constructor(reducer, initialState) {
    super();
    this.state = initialState;
    this.reducer = reducer;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.publish('change', this.state);
  }

  getState() {
    return this.state;
  }
}

const initialState = { counter: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

const store = new Store(reducer, initialState);

store.subscribe('change', state => print('State changed:', state));

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

(async function testAsyncFeatures() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  await delay(500);
  print('Async action completed');
})();

function* generator() {
  let index = 0;
  while (index < 3) {
    yield index++;
  }
}

const gen = generator();
for (let value of gen) {
  print('Generator value:', value);
}
