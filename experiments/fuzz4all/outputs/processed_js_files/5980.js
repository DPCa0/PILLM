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
                listener(...args);
            }
        }
    }
}

const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(id);
        return await response.json();
    } catch (err) {
        throw new Error(`Fetch error: ${err.message}`);
    }
};

const runProgram = async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('data', data => {
        print('Data received:', data);
    });
    eventEmitter.on('error', err => {
        console.error('Error occurred:', err);
    });

    const urls = [
        'https://api.github.com/users/github',
        'https://api.github.com/users/microsoft',
        'https://api.github.com/users/google'
    ];

    const dataPromises = urls.map(url => fetchWithTimeout(url, 3000));

    try {
        const results = await Promise.allSettled(dataPromises);

        results.forEach(result => {
            if (result.status === 'fulfilled') {
                eventEmitter.emit('data', result.value);
            } else {
                eventEmitter.emit('error', result.reason);
            }
        });
    } catch (error) {
        eventEmitter.emit('error', error);
    }
};

runProgram();
