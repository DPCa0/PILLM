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
    
    emit(event, args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(args));
        }
    }
}

const asyncOperation = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    return Math.random();
};

const processRandomValue = (value) => {
    return value > 0.5 ? "High" : "Low";
};

(async function main() {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('randomValue', (value) => {
        print(`Random Value: ${value}`);
        print(`Processed Value: ${processRandomValue(value)}`);
    });

    try {
        const randomValue = await asyncOperation();
        eventEmitter.emit('randomValue', randomValue);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
