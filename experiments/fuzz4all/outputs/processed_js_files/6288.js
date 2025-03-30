class ReactiveStore {
    constructor(initialState = {}) {
        this.state = new Proxy(initialState, this.reactiveHandler());
        this.listeners = new Map();
    }
    
    reactiveHandler() {
        return {
            set: (target, property, value) => {
                if (target[property] !== value) {
                    target[property] = value;
                    this.notify(property, value);
                }
                return true;
            }
        };
    }
    
    subscribe(property, callback) {
        if (!this.listeners.has(property)) {
            this.listeners.set(property, new Set());
        }
        this.listeners.get(property).add(callback);
        return () => this.listeners.get(property).delete(callback);
    }
    
    notify(property, value) {
        if (this.listeners.has(property)) {
            this.listeners.get(property).forEach(callback => callback(value));
        }
    }
}

 
const store = new ReactiveStore({ count: 0 });

const unsubscribeCount = store.subscribe('count', newValue => {
    print(`Count changed to: ${newValue}`);
});

store.state.count = 1;  
store.state.count = 2;  
unsubscribeCount();
store.state.count = 3;  

 
async function* asyncCounter() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield i;
    }
}

(async () => {
    for await (const num of asyncCounter()) {
        print(`Async Counter: ${num}`);
    }
})();
