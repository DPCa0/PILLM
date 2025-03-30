 
class AsyncGenerator {
    constructor(generatorFunction) {
        this.generatorFunction = generatorFunction;
    }
    
    async run() {
        const generator = this.generatorFunction();
        let result = generator.next();
        
        while (!result.done) {
            try {
                if (result.value instanceof Promise) {
                    result = generator.next(await result.value);
                } else {
                    result = generator.next(result.value);
                }
            } catch (err) {
                result = generator.throw(err);
            }
        }
        
        return result.value;
    }
}

function* taskRunner() {
    const data = yield fetchData();
    print('Data fetched:', data);
    
    const filteredData = yield processData(data);
    print('Data processed:', filteredData);
    
    return 'Task completed successfully';
}

async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
    });
}

async function processData(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data.filter(num => num % 2 === 0)), 1000);
    });
}

 
const handler = {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const observedObject = new Proxy({}, handler);
observedObject.name = 'Advanced JavaScript';
print(observedObject.name);

 
const generator = new AsyncGenerator(taskRunner);
generator.run().then(console.log).catch(console.error);
