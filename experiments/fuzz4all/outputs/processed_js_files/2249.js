 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
    });
};

 
class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

 
const processData = async () => {
    const observable = new Observable();

     
    observable.subscribe(data => print('Received:', data));

     
    const response = await fetchData();
    observable.notify(response.data);
};

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        }
        return `Property ${prop} does not exist`;
    },
    set: (target, prop, value) => {
        if (typeof value === 'string') {
            target[prop] = value;
        } else {
            console.warn(`Property ${prop} must be a string`);
        }
        return true;
    }
};

 
(async () => {
    const targetObj = {};
    const proxy = new Proxy(targetObj, handler);

    proxy.name = 'Advanced JavaScript';
    proxy.version = 42;  

    print(proxy.name);
    print(proxy.description);  

    await processData();
})();
