class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener.apply(this, args));
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeout) {
    const abortController = new AbortController();
    const id = setTimeout(() => abortController.abort(), timeout);

    try {
        const response = await fetch(url, { signal: abortController.signal });
        clearTimeout(id);
        return await response.json();
    } catch (error) {
        clearTimeout(id);
        throw new Error('Request timed out');
    }
}

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', data => {
        print('Received data:', data);
    });

    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 5000);
        emitter.emit('data', data);
    } catch (error) {
        console.error(error);
    }

     
    const target = { message: 'Hello, world!' };
    const handler = {
        get: (obj, prop) => {
            if (prop === 'message') {
                return `${obj[prop]} from Proxy!`;
            }
            return obj[prop];
        }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.message);

     
    await delay(1000);
    print('Executed after 1 second');
})();
