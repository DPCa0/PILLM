class EventEmitter {
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
            for (const listener of this.listeners.get(event)) {
                listener(...args);
            }
        }
    }
}

const asyncOperation = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success!') : reject('Failure!');
    }, 1000);
});

const emitter = new EventEmitter();

emitter.on('success', msg => print(`Operation was a success: ${msg}`));
emitter.on('failure', error => console.error(`Operation failed: ${error}`));

(async () => {
    try {
        const result = await asyncOperation();
        emitter.emit('success', result);
    } catch (error) {
        emitter.emit('failure', error);
    }
})();

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    } catch (error) {
        console.error(`Fetch Error: ${error}`);
    }
};

fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => print(`Fetched Data: ${JSON.stringify(data, null, 2)}`));
