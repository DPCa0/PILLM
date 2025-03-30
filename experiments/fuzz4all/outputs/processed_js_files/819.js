 
const asyncTask = (value, delay) => new Promise((resolve) => setTimeout(() => resolve(value), delay));

 
async function* fibonacciAsync() {
    let [prev, curr] = [0, 1];
    while (true) {
        await asyncTask(null, 100);  
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const obj = {
    status: 'Initialized'
};
const handler = {
    get(target, prop) {
        if (prop === 'status') {
            print(`Getting status: ${target[prop]}`);
        }
        return target[prop];
    },
    set(target, prop, value) {
        if (prop === 'status') {
            print(`Setting status: ${value}`);
        }
        target[prop] = value;
        return true;
    }
};
const proxyObj = new Proxy(obj, handler);

 
proxyObj.status;  
proxyObj.status = 'Updated';  

 
const processItems = (items) => {
    const map = new Map(items.map((item, index) => [index, item]));
    for (const [key, { name, value }] of map) {
        print(`Item ${key}:`, { name, value });
    }
};

 
const data = [
    { name: 'Item1', value: 10 },
    { name: 'Item2', value: 20 },
    { name: 'Item3', value: 30 },
];

processItems(data);

 
(async () => {
    const fibGenerator = fibonacciAsync();
    for (let i = 0; i < 5; i++) {
        print('Fibonacci number:', (await fibGenerator.next()).value);
    }
})();
