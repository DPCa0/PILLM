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

    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator() {
    let count = 0;
    while (true) {
        yield delay(1000).then(() => count++);
    }
}

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('tick', count => {
        print(`Tick: ${count}`);
        if (count >= 5) {
            eventEmitter.emit('done');
        }
    });
    
    eventEmitter.once('done', () => {
        print('Counting completed!');
        process.exit(0);
    });

    for await (const countPromise of asyncGenerator()) {
        const count = await countPromise;
        eventEmitter.emit('tick', count);
    }
})();
