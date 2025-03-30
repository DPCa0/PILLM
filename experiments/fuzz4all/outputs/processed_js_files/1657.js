class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    removeListener(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, new Set([...this.events.get(event)].filter(listener => listener !== listenerToRemove)));
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const withLogging = (target, key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args) {
        print(`Calling ${key} with args: ${JSON.stringify(args)}`);
        const result = await originalMethod.apply(this, args);
        print(`Finished ${key} with result: ${JSON.stringify(result)}`);
        return result;
    };
    return descriptor;
};

class DemoApp extends EventEmitter {
    constructor() {
        super();
        this.state = { message: 'Hello, World!' };
    }

    @withLogging
    async updateMessage(newMessage) {
        await delay(1000);
        this.state.message = newMessage;
        this.emit('update', this.state.message);
        return this.state.message;
    }
}

const app = new DemoApp();
app.on('update', msg => print(`State updated: ${msg}`));

(async () => {
    await app.updateMessage('Hello, JavaScript!');
})();
