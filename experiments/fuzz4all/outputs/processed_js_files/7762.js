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

function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

const fetchData = url => new Promise(resolve => {
  setTimeout(() => resolve(`Data from ${url}`), 1000);
});

const observable = new Observable();

const debouncedFetchData = debounce(async url => {
  const data = await fetchData(url);
  observable.notify(data);
}, 300);

observable.subscribe(data => print(`Subscriber 1 received: ${data}`));
observable.subscribe(data => print(`Subscriber 2 received: ${data}`));

["url1", "url2", "url3"].forEach(url => debouncedFetchData(url));
