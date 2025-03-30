class Observer {
    constructor() {
        this.listeners = new Map();
    }
    
    subscribe(event, fn) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(fn);
    }
    
    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(fn => fn(data));
        }
    }
}

class DataStore extends Observer {
    constructor() {
        super();
        this.state = new Proxy({}, {
            set: (target, key, value) => {
                target[key] = value;
                this.emit('stateChange', this.state);
                return true;
            }
        });
    }
    
    setState(key, value) {
        this.state[key] = value;
    }

    getState(key) {
        return this.state[key];
    }
}

(async function() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const dataStore = new DataStore();
    
    dataStore.subscribe('stateChange', state => print('State Changed:', state));
    
    const fetchDataAndMutateState = async () => {
        await delay(1000);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        dataStore.setState('post', data);
    };

    await fetchDataAndMutateState();
})();

