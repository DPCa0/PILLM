class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const deepClone = obj => {
    return obj && typeof obj === 'object'
        ? Array.isArray(obj)
            ? obj.map(deepClone)
            : Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepClone(v)]))
        : obj;
};

(async () => {
    const fetchWithTimeout = async (url, timeout = 5000) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchPromise = fetch(url, { signal });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => {
                controller.abort();
                reject(new Error('Fetch timed out'));
            }, timeout)
        );

        return Promise.race([fetchPromise, timeoutPromise]);
    };

    try {
        const response = await fetchWithTimeout('https://api.example.com/data');
        const data = await response.json();
        print(deepClone(data));
    } catch (error) {
        console.error(error);
    }
})();

const ee = new EventEmitter();

const logMessage = message => print(`Received: ${message}`);

ee.on('message', debounce(logMessage, 300));

ee.emit('message', 'Hello, World!');
ee.emit('message', 'Hello again!');

setTimeout(() => ee.emit('message', 'Final message!'), 1000);
