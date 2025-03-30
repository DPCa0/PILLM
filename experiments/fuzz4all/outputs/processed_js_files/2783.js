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
            for (const listener of this.events.get(event)) {
                listener.apply(this, args);
            }
        }
    }
}

const fetchWithTimeout = (url, ms) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Request timed out")), ms);
        fetch(url)
            .then(response => {
                clearTimeout(timeout);
                resolve(response.json());
            })
            .catch(err => {
                clearTimeout(timeout);
                reject(err);
            });
    });
};

async function* asyncGenerator(urls) {
    for (const url of urls) {
        try {
            const data = await fetchWithTimeout(url, 5000);
            yield data;
        } catch (err) {
            yield { error: err.message };
        }
    }
}

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

(async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('data', (data) => print('Received:', data));
    eventEmitter.on('error', (err) => console.error('Error:', err));

    for await (const data of asyncGenerator(urls)) {
        if (data.error) {
            eventEmitter.emit('error', data.error);
        } else {
            eventEmitter.emit('data', data);
        }
    }
})();
