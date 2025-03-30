class AsyncEventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
    }

    off(event, listener) {
        const listeners = this.#listeners.get(event);
        if (listeners) {
            this.#listeners.set(event, listeners.filter(l => l !== listener));
        }
    }

    async emit(event, ...args) {
        const listeners = this.#listeners.get(event);
        if (listeners) {
            await Promise.all(listeners.map(listener => listener(...args)));
        }
    }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
    const { fetch = globalThis.fetch, delay = 1000 } = options;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('data', async (data) => {
        print('Received data:', data);
    });

    emitter.on('error', async (error) => {
        console.error('Error occurred:', error);
    });

    try {
        const data = await fetchWithRetry('https://api.example.com/data');
        await emitter.emit('data', data);
    } catch (error) {
        await emitter.emit('error', error);
    }
})();
