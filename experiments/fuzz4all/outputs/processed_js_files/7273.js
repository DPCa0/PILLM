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
}

function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.7) {
                resolve(`Data from ${url}`);
            } else {
                reject('Fetch error');
            }
        }, 1000);
    });
}

async function processData(url) {
    try {
        const data = await fetchData(url);
        print(`Processing: ${data}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function* numberGenerator() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

const eventEmitter = new EventEmitter();
const gen = numberGenerator();

eventEmitter.on('data', processData);

for (let i = 0; i < 5; i++) {
    const url = `https: 
    eventEmitter.emit('data', url);
}
