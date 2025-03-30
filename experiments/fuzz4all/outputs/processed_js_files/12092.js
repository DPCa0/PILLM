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

class User {
    #privateData;

    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.#privateData = `Sensitive info for ${name}`;
    }

    getPrivateData() {
        return this.#privateData;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function complexWorkflow() {
    const emitter = new EventEmitter();
    const user = new User('Alice', 30);

    emitter.on('dataReceived', async (data) => {
        print('Processing data:', data);
        await delay(1000);
        print('Data processed:', data.toUpperCase());
    });

    print(user.getPrivateData());
    
    const fetchData = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('complexData');
            }, 2000);
        });
    };

    const data = await fetchData();
    emitter.emit('dataReceived', data);
}

complexWorkflow();
