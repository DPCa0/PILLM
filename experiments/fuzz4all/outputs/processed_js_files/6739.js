class Emitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        (this.events[event] || (this.events[event] = [])).push(listener);
    }
    
    emit(event, ...args) {
        (this.events[event] || []).forEach(listener => listener(...args));
    }
}

const createProxy = (target) => {
    return new Proxy(target, {
        get(obj, prop) {
            if (prop in obj) {
                print(`Getting property: ${prop}`);
                return obj[prop];
            }
            throw new ReferenceError(`Property ${prop} does not exist.`);
        },
        set(obj, prop, value) {
            print(`Setting property: ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
};

(async () => {
    const emitter = new Emitter();
    
    emitter.on('greet', (name) => {
        print(`Hello, ${name}!`);
    });

    const user = createProxy({ name: 'Alice', age: 30 });
    
    emitter.emit('greet', user.name);
    user.name = 'Bob';

    emitter.emit('greet', user.name);
    
     
    const fetchUserData = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ id: 1, name: 'Charlie' });
            }, 1000);
        });
    };

    const userData = await fetchUserData();
    print(`Fetched User Data: ${JSON.stringify(userData)}`);
})();
