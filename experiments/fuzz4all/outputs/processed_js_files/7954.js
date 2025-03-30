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
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }
}

const emitter = new EventEmitter();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(end) {
    for (let i = 0; i < end; i++) {
        await delay(100);
        yield i;
    }
}

async function executeComplexLogic() {
    emitter.on('event', data => print(`Event triggered with data: ${data}`));

    emitter.emit('event', 'Initialization');

    for await (const num of asyncGenerator(5)) {
        emitter.emit('event', `Generated number: ${num}`);
    }

    emitter.off('event', console.log);
    emitter.emit('event', 'Completion');  
}

executeComplexLogic();
