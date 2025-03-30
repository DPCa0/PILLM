 
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

 
const createValidatedObject = (target, validator) => {
    return new Proxy(target, {
        set(obj, prop, value) {
            if (validator(prop, value)) {
                obj[prop] = value;
                return true;
            } else {
                throw new Error(`Invalid value ${value} for property ${prop}`);
            }
        }
    });
};

 
const personValidator = (prop, value) => {
    switch (prop) {
        case 'name':
            return typeof value === 'string';
        case 'age':
            return Number.isInteger(value) && value > 0;
        default:
            return true;
    }
};

 
const person = createValidatedObject({ name: '', age: 0 }, personValidator);

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('Data retrieved') : reject('Fetch error');
        }, 1000);
    });
};

const main = async () => {
    const emitter = new EventEmitter();

    emitter.on('data', message => print(`Data event: ${message}`));
    emitter.on('error', error => print(`Error event: ${error}`));

    try {
        person.name = 'Alice';
        person.age = 30;
        print(`Person: ${JSON.stringify(person)}`);

        const data = await fetchData();
        emitter.emit('data', data);
    } catch (error) {
        emitter.emit('error', error);
    }
};

main();
