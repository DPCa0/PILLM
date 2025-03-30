const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener.apply(this, args);
    }
  }

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const filteredListeners = this.events
      .get(event)
      .filter(listener => listener !== listenerToRemove);
    this.events.set(event, filteredListeners);
  }
}

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj; 
  if (hash.has(obj)) return hash.get(obj); 
  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : Object.create(null);
  hash.set(obj, result);
  if (obj instanceof Map)
    Array.from(obj, ([key, val]) => result.set(deepClone(key, hash), deepClone(val, hash)));
  return Object.assign(
    result,
    ...Object.keys(obj).map(key => ({ [key]: deepClone(obj[key], hash) }))
  );
};

(async () => {
  const eventEmitter = new EventEmitter();
  eventEmitter.on('dataReceived', data => print('Data:', data));
  eventEmitter.on('dataReceived', data => print('Cloned Data:', deepClone(data)));

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  const handleDataReceived = debounce(data => eventEmitter.emit('dataReceived', data), 300);

  handleDataReceived(data);
})();
