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

class DataPipeline extends EventEmitter {
  constructor(initialData = []) {
    super();
    this.data = initialData;
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  process(newData) {
    let result = [...this.data, ...newData];
    for (const middleware of this.middlewares) {
      result = middleware(result);
    }
    this.data = result;
    this.emit('dataProcessed', this.data);
  }
}

 
const filterNegatives = data => data.filter(num => num >= 0);

 
(async () => {
  const pipeline = new DataPipeline([1, -2, 3]);
  
  pipeline.on('dataProcessed', data => {
    print('Processed Data:', data);
  });

  pipeline.use(filterNegatives);

  const fetchData = async () => [5, -6, 7];
  pipeline.process(await fetchData());
})();
