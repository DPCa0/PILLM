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

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const dataHandler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const appData = new Proxy({}, dataHandler);

(async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('dataReceived', ({ title, userId }) => {
        print(`Data received: Title - ${title}, UserID - ${userId}`);
    });

    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    if (data) {
        const { title, userId } = data;
        appData.title = title;
        appData.userId = userId;
        eventEmitter.emit('dataReceived', { title, userId });
    }
})();
