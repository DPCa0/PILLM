class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    emit(event, ...args) {
        if (typeof this.events[event] === 'object') {
            [...this.events[event]].forEach(listener => listener.apply(this, args));
        }
    }
}

const asyncOp = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function asyncEventExample() {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', async (message) => {
        print(`Received: ${message}`);
        await asyncOp(1000);
        print('Processed:', message);
    });

    const asyncGenerator = async function* () {
        const messages = ['Event 1', 'Event 2', 'Event 3'];
        for (const msg of messages) {
            yield msg;
        }
    };

    for await (let message of asyncGenerator()) {
        eventEmitter.emit('data', message);
    }
}

asyncEventExample();
