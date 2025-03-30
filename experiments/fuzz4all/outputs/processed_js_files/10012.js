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

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
}

function* dataGenerator(data) {
    for (let item of data) {
        yield item;
    }
}

(async function main() {
    const emitter = new EventEmitter();

    emitter.on('data', (item) => print('Data:', item));
    emitter.on('error', (error) => console.error('Error:', error));

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const generator = dataGenerator(data);

        let result = generator.next();
        while (!result.done) {
            emitter.emit('data', result.value);
            result = generator.next();
        }
    } catch (error) {
        emitter.emit('error', error);
    }
})();
