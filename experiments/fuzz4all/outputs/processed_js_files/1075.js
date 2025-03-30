class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            return Promise.all(this.events.get(event).map(listener => listener(...args)));
        }
        return Promise.resolve([]);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

const firstListener = async data => {
    print('First listener received:', data);
    await delay(1000);
    print('First listener done');
};

const secondListener = async data => {
    print('Second listener received:', data);
    await delay(500);
    print('Second listener done');
};

emitter.on('event1', firstListener);
emitter.on('event1', secondListener);

(async () => {
    print('Emitting event1...');
    await emitter.emit('event1', { message: 'Hello, world!' });
    print('All listeners done');
})();
