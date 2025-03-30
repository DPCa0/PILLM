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

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

function* generateSequence() {
  yield* [1, 2, 3, 4, 5];
}

const proxyHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist on target object.`);
      return undefined;
    }
  }
};

(async () => {
  const emitter = new EventEmitter();
  emitter.on('data', data => print('Received data:', data));
  
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    emitter.emit('data', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }

  const sequence = generateSequence();
  for (const num of sequence) {
    print('Generated number:', num);
  }

  const targetObject = { name: 'Advanced JS', type: 'Example' };
  const proxiedObject = new Proxy(targetObject, proxyHandler);
  print(proxiedObject.name);  
  print(proxiedObject.nonExistentProperty);  
})();
