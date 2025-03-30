class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

const asyncFetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const dataProcessor = (async () => {
  const dataEmitter = new EventEmitter();

  dataEmitter.on('dataFetched', data => {
    print('Processing data:', data);
  });

  dataEmitter.on('error', error => {
    console.error('Error fetching data:', error);
  });

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  for (const url of urls) {
    try {
      const data = await asyncFetchData(url);
      dataEmitter.emit('dataFetched', data);
    } catch (error) {
      dataEmitter.emit('error', error);
    }
  }
})();

const promiseHandler = (promise) => {
  promise
    .then(data => console.log('Resolved:', data))
    .catch(err => console.error('Rejected:', err));
};

const examplePromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise resolved!'), 1000);
});

promiseHandler(examplePromise);
