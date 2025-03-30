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

async function* asyncGenerator() {
    const data = [1, 2, 3, 4, 5];
    for (const num of data) {
        yield await new Promise(resolve => setTimeout(() => resolve(num * 2), 100));
    }
}

const runApp = async () => {
    const events = new EventEmitter();

    events.on('data', data => {
        print(`Received data: ${data}`);
    });

    const gen = asyncGenerator();

    for await (const value of gen) {
        events.emit('data', value);
    }

    const result = await new Promise((resolve, reject) => {
        setTimeout(() => resolve('All data processed!'), 1000);
    });

    print(result);
};

runApp();
