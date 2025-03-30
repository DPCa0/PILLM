const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

class Emitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) this.listeners.set(event, []);
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await fetchData(url);
    print('Fetched Data:', data);

    const emitter = new Emitter();
    emitter.on('dataReceived', (data) => print('Data received:', data));
    emitter.emit('dataReceived', data);

    const processInput = debounce((input) => {
        print('Processing input:', input);
    }, 300);

    processInput('Hello');
    setTimeout(() => processInput('World'), 100);
})();
