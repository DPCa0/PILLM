 
class AdvancedEventEmitter {
    constructor() {
        this.events = {};
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                if (prop === 'on' || prop === 'emit') {
                    return (event, ...args) => Reflect.get(target, prop, receiver).call(receiver, event, ...args);
                }
            },
            set: (target, prop, value) => {
                if (prop in target) {
                    return Reflect.set(target, prop, value);
                }
                if (typeof value === 'function') {
                    if (!target.events[prop]) target.events[prop] = [];
                    target.events[prop].push(value);
                    return true;
                }
                return false;
            }
        });
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            for (const listener of this.events[event]) {
                listener(...args);
            }
        }
    }
}

 
const emitter = new AdvancedEventEmitter();

emitter.on('greet', (name) => print(`Hello, ${name}!`));
emitter.on('greet', (name) => print(`How are you, ${name}?`));

 
const dynamicEvent = 'farewell';
emitter[dynamicEvent] = (name) => print(`Goodbye, ${name}!`);

emitter.emit('greet', 'Alice');
emitter.emit(dynamicEvent, 'Bob');

 
async function execute() {
    print('Starting...');
    await new Promise(resolve => setTimeout(resolve, 1000));  
    emitter.emit('greet', 'Charlie');
    await new Promise(resolve => setTimeout(resolve, 1000));  
    emitter.emit('farewell', 'Charlie');
    print('Finished.');
}

execute();
