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

const debounce = (func, delay) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
};

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
};

(async function main() {
    const emitter = new EventEmitter();

    emitter.on('data', debounce(data => {
        print('Data received:', data);
    }, 300));

    try {
        const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', {}, 3000);
        if (response.ok) {
            const data = await response.json();
            emitter.emit('data', data);
        } else {
            console.error('Fetch error:', response.status);
        }
    } catch (error) {
        console.error('Fetch timeout or network error:', error);
    }
})();
