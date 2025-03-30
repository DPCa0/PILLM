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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fetchWithExponentialBackoff(url, maxRetries = 5) {
    let attempts = 0;
    let waitTime = 500;

    while (attempts < maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            yield await response.json();
            return;
        } catch (error) {
            attempts += 1;
            console.warn(`Attempt ${attempts}: ${error.message}`);
            if (attempts < maxRetries) await delay(waitTime);
            waitTime *= 2;
        }
    }
    throw new Error('Max retries reached');
}

(async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('data', data => print('Received data:', data));
    eventEmitter.on('error', error => console.error('Error:', error));

    try {
        const dataGenerator = fetchWithExponentialBackoff('https://jsonplaceholder.typicode.com/todos/1');
        for await (const data of dataGenerator) {
            eventEmitter.emit('data', data);
        }
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
