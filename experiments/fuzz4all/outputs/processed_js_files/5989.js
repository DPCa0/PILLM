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

const fetchJson = url => fetch(url).then(response => {
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
});

async function* fetchSequentially(urls) {
  for (const url of urls) {
    yield await fetchJson(url);
  }
}

const executeTasks = async (urls, emitter) => {
  for await (const jsonData of fetchSequentially(urls)) {
    emitter.emit('data', jsonData);
  }
  emitter.emit('end', 'All tasks completed.');
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

const emitter = new EventEmitter();

emitter.on('data', data => {
  print('Received data:', data);
});

emitter.on('end', message => {
  print(message);
});

executeTasks(urls, emitter);
