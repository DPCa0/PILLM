class CustomEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response.json();
}

const eventEmitter = new CustomEventEmitter();

eventEmitter.on('dataReceived', data => {
    print('Data received:', data);
    const doubledData = data.map(num => num * 2);
    eventEmitter.emit('dataDoubled', doubledData);
});

eventEmitter.on('dataDoubled', doubledData => {
    print('Doubled Data:', doubledData);
    const sum = doubledData.reduce((acc, num) => acc + num, 0);
    print('Sum of Doubled Data:', sum);
});

(async function executeComplexOperation() {
    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos', 3000);
        const numbers = data.map(item => item.id);
        eventEmitter.emit('dataReceived', numbers);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
