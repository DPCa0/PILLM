class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }
    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function complexLogic() {
    try {
        let [result1, result2] = await Promise.all([
            asyncOperation(1000).then(() => "Result 1"),
            asyncOperation(1500).then(() => "Result 2")
        ]);

        const processResults = () => {
            print(`Processed: ${result1} and ${result2}`);
        };

        let proxy = new Proxy(processResults, {
            apply: function(target, thisArg, argumentsList) {
                print('Processing results with a Proxy');
                return target.apply(thisArg, argumentsList);
            }
        });

        proxy();
    } catch (err) {
        console.error('Error in complex logic:', err);
    }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('start', () => print('Starting complex logic...'));
eventEmitter.on('end', () => print('Finished complex logic.'));

eventEmitter.emit('start');
complexLogic().then(() => eventEmitter.emit('end'));
