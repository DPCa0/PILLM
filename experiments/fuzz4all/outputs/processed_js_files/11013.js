class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
    return this;
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
}

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

async function processData(urls) {
  const results = await Promise.allSettled(urls.map(url => fetchData(url)));
  return results.filter(result => result.status === 'fulfilled').map(result => result.value);
}

const runExample = async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', ''];

  const eventEmitter = new EventEmitter();

  eventEmitter.on('success', data => {
    print('Fetched Data:', data);
  });

  eventEmitter.on('error', error => {
    console.error('Error:', error);
  });

  try {
    const data = await processData(urls);
    eventEmitter.emit('success', data);
  } catch (error) {
    eventEmitter.emit('error', error);
  }
};

runExample();
