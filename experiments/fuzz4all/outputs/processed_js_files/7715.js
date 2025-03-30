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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            const filteredListeners = this.events.get(event).filter(
                listener => listener !== listenerToRemove
            );
            this.events.set(event, filteredListeners);
        }
    }
}

class AsyncOperation {
    static async fetchData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error(`Fetch error: ${error.message}`);
            return null;
        }
    }
}

(async function() {
    const emitter = new EventEmitter();

    const listener = data => print(`Data received: ${JSON.stringify(data)}`);
    emitter.on('dataFetched', listener);

    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await AsyncOperation.fetchData(url);

    if (data) {
        emitter.emit('dataFetched', data);
    }

     
    emitter.off('dataFetched', listener);

     
    emitter.emit('dataFetched', { dummy: 'This should not appear' });
})();
