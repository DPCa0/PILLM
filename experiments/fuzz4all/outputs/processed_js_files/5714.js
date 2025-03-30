class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(...args));
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const main = async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataReceived', (data) => {
        print('Data received:', data);
    });

    eventEmitter.on('dataReceived', (data) => {
        const maxData = Math.max(...data);
        print('Max value:', maxData);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos');
        eventEmitter.emit('dataReceived', data.map(item => item.id));
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

main();
