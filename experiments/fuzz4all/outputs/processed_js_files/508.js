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
      listener(...args);
    }
  }
}

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchJSON() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

async function* paginate(fetcher, pageSize = 10) {
  const data = await fetcher.fetchJSON();
  for (let i = 0; i < data.length; i += pageSize) {
    yield data.slice(i, i + pageSize);
  }
}

(async () => {
  const eventEmitter = new EventEmitter();
  const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');

  eventEmitter.on('pageFetched', (page) => {
    print('New page:', page);
  });

  try {
    for await (const page of paginate(dataFetcher)) {
      eventEmitter.emit('pageFetched', page);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
