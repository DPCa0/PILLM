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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }
}

class DataPipeline {
    constructor(...fns) {
        this.fns = fns;
    }

    async process(data) {
        for (const fn of this.fns) {
            data = await fn(data);
        }
        return data;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

function filterData(criteria) {
    return data => data.filter(item => criteria(item));
}

function transformData(transform) {
    return data => data.map(item => transform(item));
}

(async function() {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('dataReady', data => {
        print('Filtered Data:', data);
    });

    const pipeline = new DataPipeline(
        fetchData,
        filterData(item => item.id % 2 === 0),
        transformData(item => ({ ...item, transformed: true }))
    );

    const dataUrl = 'https://jsonplaceholder.typicode.com/todos';
    
    const processedData = await pipeline.process(dataUrl);
    eventEmitter.emit('dataReady', processedData);

})();
