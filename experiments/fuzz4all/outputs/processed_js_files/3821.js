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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const pipeline = async (...fns) => {
    return async (input) => {
        let result = input;
        for (const fn of fns) {
            result = await fn(result);
        }
        return result;
    };
};

const fetchWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Fetch failed');
            return response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await delay(1000);
        }
    }
};

(async () => {
    const emitter = new EventEmitter();
    emitter.on('data', data => print('Received data:', data));

    const dataProcessingPipeline = pipeline(
        async (data) => data.map(item => item * 2),
        async (data) => data.filter(item => item > 10),
        async (data) => {
            emitter.emit('data', data);
            return data;
        }
    );

    try {
        const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts');
        await dataProcessingPipeline(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
