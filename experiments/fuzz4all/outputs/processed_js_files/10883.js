class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

async function* asyncGenerator(arr) {
    for (const item of arr) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield item * 2;
    }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('data', data => print(`Data received: ${data}`));

(async () => {
    const numbers = [1, 2, 3, 4, 5];
    for await (const num of asyncGenerator(numbers)) {
        eventEmitter.emit('data', num);
    }
})();

const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.allSettled([p1, p2, p3]).then(results => {
    print('All Promises Settled:', results);
});

function dynamicImports(moduleName) {
    import(`./${moduleName}.js`)
        .then(module => {
            module.default();
        })
        .catch(err => {
            console.error(`Failed to load module ${moduleName}:`, err);
        });
}

 
