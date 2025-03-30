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

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject('Fetch error');
            }
        }, 1000);
    });
};

const getDataAndNotify = async (url, emitter) => {
    try {
        const data = await fetchData(url);
        emitter.emit('dataReceived', data);
    } catch (error) {
        emitter.emit('error', error);
    }
};

 
const handler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

const emitter = new EventEmitter();
emitter.on('dataReceived', data => print('Data received:', data));
emitter.on('error', error => console.error('Error:', error));

 
getDataAndNotify('https://api.example.com/data', emitter);

 
print(proxy.a);
print(proxy.b);
