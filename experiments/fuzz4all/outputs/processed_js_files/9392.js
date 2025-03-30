class AsyncEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    off(event, listener) {
        if (this.listeners.has(event)) {
            this.listeners.set(event, this.listeners.get(event).filter(l => l !== listener));
        }
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            return Promise.all(this.listeners.get(event).map(listener => listener(...args)));
        }
        return Promise.resolve([]);
    }
}

(async function main() {
    const emitter = new AsyncEventEmitter();

    const fetchData = async url => {
        const response = await fetch(url);
        return response.json();
    };

    emitter.on('data', async data => {
        print('Listener 1 received data:', data);
    });

    emitter.on('data', async data => {
        print('Listener 2 processing data asynchronously:', await Promise.resolve(data * 2));
    });

    emitter.on('error', err => {
        console.error('Error event:', err);
    });

    try {
        const data = await fetchData('https://api.example.com/data');
        await emitter.emit('data', data);
    } catch (err) {
        await emitter.emit('error', err);
    }

    emitter.off('data', listener1);

     
    print('Events emitted and listeners executed.');
})();
