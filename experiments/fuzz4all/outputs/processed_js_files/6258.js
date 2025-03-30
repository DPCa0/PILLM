class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('greet', async (name) => {
        await delay(1000);
        print(`Hello, ${name}!`);
    });

    emitter.on('greet', async (name) => {
        await delay(500);
        print(`How are you, ${name}?`);
    });

    await emitter.emit('greet', 'Alice');

    const fetchJson = url => fetch(url).then(res => res.json());
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';

    try {
        const users = await fetchJson(usersUrl);
        print(`Fetched ${users.length} users`);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
})();
