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

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', data => {
        print('Data received:', data);
    });

    try {
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        const data = await fetchData(url);
        emitter.emit('data', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
