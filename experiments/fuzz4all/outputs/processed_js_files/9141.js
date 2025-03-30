 
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

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve("Operation Complete"), 1000));

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', (message) => {
        print('Received message:', message);
    });

    const operationStatus = await asyncOperation();

    emitter.emit('data', operationStatus);

    const complexObject = {
        data: [1, 2, 3, 4, 5],
        async processData() {
            let total = 0;
            for (const num of this.data) {
                total += num;
                await new Promise(res => setTimeout(res, 200));
                print(`Current Total: ${total}`);
            }
            return total;
        }
    };

    const totalResult = await complexObject.processData();
    print(`Final Result: ${totalResult}`);
})();
