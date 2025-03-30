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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
        }
    }
}

const asyncOperation = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const advancedFeatureDemo = async () => {
    const emitter = new EventEmitter();

     
    const handler = {
        get(target, propKey) {
            print(`Getting ${propKey}`);
            return target[propKey];
        },
        apply(target, thisArg, argumentsList) {
            print(`Calling ${target.name} with arguments: ${argumentsList}`);
            return target.apply(thisArg, argumentsList);
        }
    };

     
    const proxiedAsyncOp = new Proxy(asyncOperation, handler);

     
    const onComplete = () => print('Async operation completed!');
    const onStart = () => print('Starting async operation...');

    emitter.on('start', onStart);
    emitter.on('complete', onComplete);

     
    emitter.emit('start');
    await proxiedAsyncOp(1000);
    emitter.emit('complete');

     
    emitter.off('complete', onComplete);
    emitter.emit('complete');
};

advancedFeatureDemo();
