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

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

async function* dataStream(url) {
  let page = 1;
  while (true) {
    try {
      const data = await fetchData(`${url}?page=${page}`);
      yield data;
      if (!data.length) break;
      page++;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

const processItem = async (item) => {
   
  await new Promise(resolve => setTimeout(resolve, 100));
  print(`Processed: ${item}`);
};

const processDataStream = async (url) => {
  const emitter = new EventEmitter();

  emitter.on('data', async (data) => {
    await Promise.all(data.map(processItem));
  });

  emitter.on('end', () => {
    print('All data processed');
  });

  for await (const data of dataStream(url)) {
    emitter.emit('data', data);
  }
  emitter.emit('end');
};

 
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
processDataStream(apiUrl);
