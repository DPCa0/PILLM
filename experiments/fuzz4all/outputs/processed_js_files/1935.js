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

const delayedExecution = async (duration, ...tasks) => {
    for (let task of tasks) {
        await new Promise(resolve => setTimeout(resolve, duration));
        await task();
    }
};

const fetchData = async url => {
    const response = await fetch(url);
    return await response.json();
};

const processData = data => {
    return Object.entries(data).map(([key, value]) => ({
        id: key,
        value
    }));
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataFetched', data => {
        print('Processing data...');
        const processed = processData(data);
        print('Processed Data:', processed);
    });

    eventEmitter.on('error', error => {
        console.error('An error occurred:', error);
    });

    const tasks = [
        async () => {
            try {
                const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
                eventEmitter.emit('dataFetched', data);
            } catch (error) {
                eventEmitter.emit('error', error);
            }
        },
        async () => {
            print('All tasks completed.');
        }
    ];

    await delayedExecution(1000, ...tasks);
})();
