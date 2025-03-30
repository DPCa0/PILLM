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
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function compose(...fns) {
    return fns.reduce((f, g) => (...args) => f(g(...args)));
}

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const processNumber = compose(
    n => n * 2,
    n => n + 3
);

async function main() {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', data => {
        print('Data received:', data);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        eventEmitter.emit('data', data);

        for (const number of range(1, 5)) {
            print(`Processed number: ${processNumber(number)}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
