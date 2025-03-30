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

function asyncOperation(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Result from operation ${id}`), Math.random() * 1000);
    });
}

(async () => {
    const eventEmitter = new EventEmitter();
  
    eventEmitter.on('data', data => {
        print('Received data:', data);
    });

    const operations = Array.from({ length: 5 }, (_, i) => asyncOperation(i));
    const results = await Promise.allSettled(operations);

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            eventEmitter.emit('data', result.value);
        } else {
            console.error('Operation failed:', result.reason);
        }
    });
})();
