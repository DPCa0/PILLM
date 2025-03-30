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
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncGenerator = async function* () {
    let i = 1;
    while (true) {
        await delay(1000);
        yield i++;
    }
};

const fetchData = async () => {
    const eventEmitter = new EventEmitter();
    const dataStream = asyncGenerator();
    
    eventEmitter.on('data', data => print(`Received data: ${data}`));

    for await (const data of dataStream) {
        eventEmitter.emit('data', data);
        if (data === 5) break;  
    }
};

fetchData();
