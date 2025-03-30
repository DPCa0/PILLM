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
            for (const listener of this.events.get(event)) {
                listener.apply(this, args);
            }
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const fetchWithTimeout = (url, timeout) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);

        fetch(url)
            .then(response => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch(err => {
                clearTimeout(timer);
                reject(err);
            });
    });
};

const main = async () => {
    const ee = new EventEmitter();

    ee.on('data', data => print('Data received:', data));
    ee.on('error', err => console.error('Error occurred:', err));

    try {
        const response = await fetchWithTimeout('https://api.example.com/data', 5000);
        const data = await response.json();
        ee.emit('data', data);
    } catch (err) {
        ee.emit('error', err);
    }
};

main();
