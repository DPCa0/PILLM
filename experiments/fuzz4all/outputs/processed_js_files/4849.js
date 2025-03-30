(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  class EventEmitter {
    constructor() {
      this.events = {};
    }

    on(event, listener) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(listener);
    }

    emit(event, ...args) {
      if (this.events[event]) this.events[event].forEach(listener => listener(...args));
    }
  }

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  class DataProcessor extends EventEmitter {
    constructor(data) {
      super();
      this.data = data;
    }

    async process() {
      this.emit('start', this.data);
      await delay(1000);  
      const processed = this.data.map(item => ({ ...item, processed: true }));
      this.emit('end', processed);
    }
  }

  try {
    const rawData = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const processor = new DataProcessor(rawData);

    processor.on('start', data => print('Processing started with data size:', data.length));
    processor.on('end', processed => print('Processing ended. Processed data size:', processed.length));

    await processor.process();
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
