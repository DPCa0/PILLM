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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
        }
    }
}

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPromise = fetch(url, { signal });
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
        controller.abort();
        reject(new Error('Fetch timed out'));
    }, timeout));

    return Promise.race([fetchPromise, timeoutPromise]);
}

async function* dataStream(urls) {
    for (const url of urls) {
        try {
            const response = await fetchWithTimeout(url);
            const data = await response.json();
            yield data;
        } catch (error) {
            yield { error: error.message };
        }
    }
}

(async function main() {
    const emitter = new EventEmitter();

    emitter.on('data', data => {
        print('Received:', data);
    });

    emitter.on('error', error => {
        console.error('Error:', error);
    });

    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/invalid-url'
    ];

    for await (const result of dataStream(urls)) {
        if (result.error) {
            emitter.emit('error', result.error);
        } else {
            emitter.emit('data', result);
        }
    }
})();
