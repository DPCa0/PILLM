class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const fetchPromise = fetch(url, { signal });

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetchPromise;
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (signal.aborted) {
      throw new Error('Fetch timed out');
    }
    throw error;
  }
};

const createProxy = (target, handler) => {
  return new Proxy(target, handler);
};

(async () => {
  const dataObservable = new Observable();

  dataObservable.subscribe(data => print('Subscriber 1:', data));
  dataObservable.subscribe(data => print('Subscriber 2:', data));

  try {
    const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    dataObservable.notify(data.slice(0, 5));
  } catch (error) {
    console.error('Fetch error:', error);
  }

  const target = { x: 10, y: 20 };
  const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} does not exist`),
    set: (obj, prop, value) => {
      if (typeof value === 'number') {
        obj[prop] = value;
        return true;
      } else {
        throw new Error('Value must be a number');
      }
    }
  };

  const proxy = createProxy(target, handler);
  print(proxy.x);
  print(proxy.z);
  proxy.y = 30;
  print(proxy.y);

  try {
    proxy.y = 'not a number';
  } catch (error) {
    console.error(error.message);
  }
})();
