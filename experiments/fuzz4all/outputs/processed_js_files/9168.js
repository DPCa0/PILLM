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
    return await response.json();
}

const eventEmitter = new EventEmitter();

eventEmitter.on('dataFetched', data => {
    print('Data received:', data);
    print('Processed Data:', data.map(item => ({ id: item.id, value: item.value * 2 })));
});

async function main() {
    try {
        const data = await fetchData('https://api.example.com/data');
        eventEmitter.emit('dataFetched', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
