class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] || (this.events[event] = [])).push(listener);
        return this;
    }

    emit(event, ...args) {
        (this.events[event] || []).forEach(fn => fn(...args));
    }
}

 
const state = new Proxy({}, {
    get(target, prop) {
        print(`Getting ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
});

 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
(async () => {
    const emitter = new EventEmitter();

     
    emitter.on('data', data => print('Data received:', data));
    emitter.on('data', data => {
        state.latestData = data;
        print('Updated state with latest data');
    });

     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    
     
    emitter.emit('data', data);

     
    print(state.latestData);
    state.anotherProperty = 'Hello, world!';
})();
