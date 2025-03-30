 
const arrayHandler = {
    get(target, property, receiver) {
        if (property === 'push') {
            return function (...args) {
                print(`Adding elements: ${args}`);
                return Reflect.apply(target.push, target, args);
            };
        }
        return Reflect.get(target, property, receiver);
    }
};

 
const proxiedArray = new Proxy([], arrayHandler);

 
function* generateValues() {
    yield* [10, 20, 30, 40, 50];
}

 
async function processValues() {
    for await (const value of generateValues()) {
        proxiedArray.push(value);
    }
}

 
const valueCount = new Map();

 
processValues().then(() => {
    for (const value of proxiedArray) {
        valueCount.set(value, (valueCount.get(value) || 0) + 1);
    }

     
    print(`Processed values: ${[...proxiedArray].join(', ')}`);
    print('Value Counts:');
    valueCount.forEach((count, value) =>
        console.log(`${value} appears ${count} times`)
    );
});
