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

const emitter = new EventEmitter();

const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        clearTimeout(id);
    }
};

const fetchDataAndEmit = async (url) => {
    try {
        const data = await fetchWithTimeout(url);
        emitter.emit('data', data);
    } catch (error) {
        emitter.emit('error', error);
    }
};

emitter.on('data', (data) => {
    print('Fetched Data:', data);
});

emitter.on('error', (error) => {
    console.error('Error:', error);
});

(async () => {
    await Promise.allSettled([
        fetchDataAndEmit('https://api.example.com/data1'),
        fetchDataAndEmit('https://api.example.com/data2')
    ]);

    const uniqueData = new Set(['item1', 'item2', 'item3']);
    uniqueData.add('item4').add('item1');  

    print('Unique Items:', [...uniqueData]);
})();
