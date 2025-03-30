class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

const cacheProxyHandler = {
    cache: new Map(),
    get(target, prop, receiver) {
        if (!this.cache.has(prop)) {
            this.cache.set(prop, Reflect.get(target, prop, receiver));
        }
        return this.cache.get(prop);
    }
};

const apiData = new Proxy({
    users: () => fetchData('https://jsonplaceholder.typicode.com/users'),
    posts: () => fetchData('https://jsonplaceholder.typicode.com/posts')
}, cacheProxyHandler);

(async function main() {
    const events = new EventEmitter();

    events.on('dataFetched', (data) => {
        print(`Received data: ${JSON.stringify(data, null, 2)}`);
    });

    try {
        const [users, posts] = await Promise.all([apiData.users(), apiData.posts()]);
        events.emit('dataFetched', { users, posts });
    } catch (error) {
        console.error(`Failed to fetch data: ${error.message}`);
    }
})();
