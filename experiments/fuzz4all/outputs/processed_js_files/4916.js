class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
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

(async function() {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('data', (data) => {
        print('Data received:', data);
    });
    
    eventEmitter.on('error', (error) => {
        console.error('Error:', error);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        eventEmitter.emit('data', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    async function* dataStream(interval) {
        let count = 0;
        while (count < 5) {
            await delay(interval);
            yield count++;
        }
    }

    for await (const value of dataStream(1000)) {
        print('Streamed data:', value);
    }
})();
