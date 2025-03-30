class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

(async () => {
    const eventEmitter = new EventEmitter();

    const logger = (data) => print('Data Received:', data);
    const dataHandler = async () => {
        try {
            const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
            eventEmitter.emit('dataFetched', data);
        } catch (error) {
            console.error('Fetching data failed', error);
        }
    };

    eventEmitter.on('dataFetched', logger);

     
    const dataProxy = new Proxy(eventEmitter, {
        set(target, prop, value) {
            if (prop === 'events' && typeof value === 'object') {
                print('Modifying events:', value);
            }
            target[prop] = value;
            return true;
        }
    });

    await dataHandler();
    dataProxy.off('dataFetched', logger);
})();
