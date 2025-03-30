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

 
function fetchDataWithTimeout(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const emitter = new EventEmitter();
        let isResolved = false;

        emitter.on('timeout', () => {
            if (!isResolved) {
                isResolved = true;
                reject(new Error('Request timed out'));
            }
        });

        setTimeout(() => emitter.emit('timeout'), timeout);

        fetch(url).then(response => {
            if (!isResolved) {
                isResolved = true;
                resolve(response.json());
            }
        }).catch(error => {
            if (!isResolved) {
                isResolved = true;
                reject(error);
            }
        });
    });
}

(async () => {
    try {
        const data = await fetchDataWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 3000);
        print('Data received:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
