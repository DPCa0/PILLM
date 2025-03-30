class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

class CustomDataProcessor {
  constructor(data) {
    this.data = data;
    this.emitter = new EventEmitter();
  }

  async processData() {
    try {
      const transformedData = await this.transformData();
      this.emitter.emit('success', transformedData);
    } catch (error) {
      this.emitter.emit('error', error);
    }
  }

  transformData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const transformedData = this.data.map(item => ({ ...item, timestamp: Date.now() }));
        transformedData.length ? resolve(transformedData) : reject(new Error('Transformation failed'));
      }, 1000);
    });
  }

  on(event, listener) {
    this.emitter.on(event, listener);
  }
}

const processor = new CustomDataProcessor([{ name: 'Item 1' }, { name: 'Item 2' }]);

processor.on('success', data => {
  print('Data processed successfully:', data);
});

processor.on('error', error => {
  console.error('Processing error:', error);
});

processor.processData();
