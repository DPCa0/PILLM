 

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

    removeListener(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
        }
    }
}

const emitter = new EventEmitter();

function asyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            print('Async operation complete');
            resolve();
        }, 1000);
    });
}

(async () => {
     
    const handler = {
        get(target, propKey, receiver) {
            print(`Accessing property "${propKey}"`);
            return Reflect.get(target, propKey, receiver);
        }
    };

    const proxiedEmitter = new Proxy(emitter, handler);

    function onEvent(data) {
        print('Event received:', data);
    }

    proxiedEmitter.on('event', onEvent);
    proxiedEmitter.emit('event', { message: 'Hello, world!' });

     
    await asyncOperation();

    proxiedEmitter.removeListener('event', onEvent);
    proxiedEmitter.emit('event', { message: 'This will not be logged' });

})();
