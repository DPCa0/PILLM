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

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

async function main() {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('dataFetched', (data) => {
        print('Data:', data);
    });

    eventEmitter.on('error', (error) => {
        console.error('Error:', error);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('dataFetched', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }

    const sequence = generateSequence(1, 5);
    print('Generated Sequence:', [...sequence]);
}

main();
