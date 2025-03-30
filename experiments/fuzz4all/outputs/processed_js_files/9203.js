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

const asyncOperation = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            print('Async operation completed');
            resolve('Data from async operation');
        }, 1000);
    });
};

(async () => {
    const eventEmitter = new EventEmitter();

    const fetchData = async () => {
        const data = await asyncOperation();
        eventEmitter.emit('dataReceived', data);
    };

    eventEmitter.on('dataReceived', (data) => {
        print('Event received:', data);
    });

    fetchData();
})();

const templateLiteral = (name) => `Hello, ${name}!`;
print(templateLiteral('world'));

const mapData = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
print([...mapData.entries()].map(([key, value]) => ({ key, value })));

const { x, y } = { x: 10, y: 20, z: 30 };
print(`Extracted x: ${x}, y: ${y}`);

const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);
print('Doubled array:', doubled);
