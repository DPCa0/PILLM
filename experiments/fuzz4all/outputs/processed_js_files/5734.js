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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Fetch Error:', error);
    }
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const emitter = new EventEmitter();
const gen = idGenerator();

emitter.on('data', async (url) => {
    print(`Fetching data from ${url}`);
    try {
        const data = await fetchData(url);
        print(`Data fetched: ${JSON.stringify(data)}`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
});

async function main() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    for (const url of urls) {
        print(`Generated ID: ${gen.next().value}`);
        emitter.emit('data', url);
        await delay(1000);
    }
}

main();
