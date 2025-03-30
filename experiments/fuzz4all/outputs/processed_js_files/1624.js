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
    off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
}

 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

 
const createReactiveObject = (target, callback) => {
    return new Proxy(target, {
        set(obj, prop, value) {
            Reflect.set(obj, prop, value);
            callback(prop, value);
            return true;
        }
    });
};

 
const eventEmitter = new EventEmitter();
eventEmitter.on('data', data => print(`Data received: ${data}`));

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        const data = await fetchData(url);
        eventEmitter.emit('data', JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
})();

const user = { name: 'John', age: 30 };
const reactiveUser = createReactiveObject(user, (prop, value) => {
    print(`Property ${prop} changed to ${value}`);
});

reactiveUser.name = 'Jane';
reactiveUser.age = 31;
