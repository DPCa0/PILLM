class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async process() {
        if (this.processing) return;
        this.processing = true;
        while (this.queue.length > 0) {
            const fn = this.queue.shift();
            await fn();
        }
        this.processing = false;
    }

    enqueue(fn) {
        this.queue.push(fn);
        this.process();
    }
}

const queue = new AsyncQueue();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchData = async (id) => {
    print(`Fetching data for id: ${id}`);
    await delay(1000);
    print(`Data fetched for id: ${id}`);
};

[1, 2, 3, 4, 5].forEach(id => {
    queue.enqueue(() => fetchData(id));
});

const createProxy = (target) => {
    return new Proxy(target, {
        get(obj, prop) {
            if (prop in obj) {
                print(`Getting property '${prop}'`);
                return Reflect.get(obj, prop);
            }
            throw new ReferenceError(`Property '${prop}' does not exist.`);
        },
        set(obj, prop, value) {
            print(`Setting property '${prop}' to '${value}'`);
            return Reflect.set(obj, prop, value);
        }
    });
};

const obj = createProxy({ a: 1, b: 2 });
print(obj.a);  
obj.b = 3;  
print(obj.b);  
