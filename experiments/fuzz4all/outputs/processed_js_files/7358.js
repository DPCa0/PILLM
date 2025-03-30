class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
  await delay(1000);  
  return fetch(url).then(response => response.json());
};

const memoize = (fn) => {
  const cache = new Map();
  return async function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

const observable = new Observable();

observable.subscribe(data => print(`Subscriber 1 received: ${JSON.stringify(data)}`));
observable.subscribe(data => print(`Subscriber 2 received: ${JSON.stringify(data)}`));

const memoizedFetchData = memoize(fetchData);

(async function main() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await memoizedFetchData(url);
  observable.notify(data);

  const data2 = await memoizedFetchData(url);  
  observable.notify(data2);
})();
