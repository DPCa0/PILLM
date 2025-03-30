class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const dataCache = new Proxy({}, {
    get(target, property) {
        if (!target[property]) throw new ReferenceError(`Property ${property} does not exist`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting value for ${property}`);
        target[property] = value;
        return true;
    }
});

(async () => {
    const emitter = new EventEmitter();

    emitter.on('dataReceived', data => {
        print('Data received:', data);
        dataCache['apiData'] = data;
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        emitter.emit('dataReceived', data);
        print('Cached Data:', dataCache['apiData']);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
