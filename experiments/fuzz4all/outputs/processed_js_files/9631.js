class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(callback) {
    this.subscribers.add(callback);
  }
  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }
  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
   
  await delay(1000);
  return `Data from ${url}`;
};

const asyncHandler = (fn) => {
  return (...args) => {
    fn(...args).catch(err => console.error(`Error: ${err.message}`));
  };
};

const process = asyncHandler(async (url) => {
  const data = await fetchData(url);
  observer.notify(data);
});

const observer = new Observable();

observer.subscribe(data => print(`Subscriber 1 received: ${data}`));
observer.subscribe(data => print(`Subscriber 2 received: ${data.toUpperCase()}`));

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

urls.forEach(url => process(url));
