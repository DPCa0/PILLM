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
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener.apply(this, args));
        }
    }

    off(event, listenerToRemove) {
        const listeners = this.events.get(event);
        if (listeners) {
            this.events.set(event, listeners.filter(listener => listener !== listenerToRemove));
        }
    }
}

 
function logExecution(target, name, descriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        print(`Executing ${name} with arguments: ${JSON.stringify(args)}`);
        return original.apply(this, args);
    }
    return descriptor;
}

class ComplexSystem extends EventEmitter {
    constructor() {
        super();
        this.state = {
            value: 0,
        };
    }

    @logExecution
    updateState(newValue) {
        const oldValue = this.state.value;
        this.state.value = newValue;
        this.emit('stateChange', oldValue, newValue);
    }
}

const system = new ComplexSystem();
system.on('stateChange', (oldValue, newValue) => {
    print(`State changed from ${oldValue} to ${newValue}`);
});

system.updateState(42);
system.updateState(100);
