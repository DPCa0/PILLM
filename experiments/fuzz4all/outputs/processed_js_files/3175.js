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
}

 
const personHandler = {
    set(target, property, value) {
        if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
            throw new Error('Age must be a positive number');
        }
        target[property] = value;
        return true;
    }
};

class Person extends EventEmitter {
    constructor(name, age) {
        super();
        this._data = new Proxy({ name, age }, personHandler);
    }

    get name() {
        return this._data.name;
    }

    set name(value) {
        this._data.name = value;
        this.emit('nameChanged', value);
    }

    get age() {
        return this._data.age;
    }

    set age(value) {
        this._data.age = value;
        this.emit('ageChanged', value);
    }
}

 
async function* fetchData(urls) {
    for (const url of urls) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield fetch(url).then(res => res.json());
    }
}

 
const john = new Person('John Doe', 30);
john.on('nameChanged', (newName) => print(`Name changed to ${newName}`));
john.on('ageChanged', (newAge) => print(`Age changed to ${newAge}`));

john.name = 'John Smith';
john.age = 31;

(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    for await (const data of fetchData(urls)) {
        print(data);
    }
})();
