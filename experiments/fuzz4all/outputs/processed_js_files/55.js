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

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
}

class DataProxy {
    constructor(data) {
        return new Proxy(data, {
            get(target, prop) {
                if (prop in target) {
                    print(`Get: ${prop} => ${target[prop]}`);
                    return target[prop];
                }
                return undefined;
            },
            set(target, prop, value) {
                print(`Set: ${prop} => ${value}`);
                target[prop] = value;
                return true;
            }
        });
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const emitter = new EventEmitter();
emitter.on('greet', name => print(`Hello, ${name}!`));

const data = new DataProxy({ greeting: 'Hello' });

emitter.emit('greet', 'world');

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();

data.greeting = 'Hi';
print(data.greeting);
