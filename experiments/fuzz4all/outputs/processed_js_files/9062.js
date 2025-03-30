 
async function* fetchPaginatedData(url, pages) {
    for (let page = 1; page <= pages; page++) {
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();
        yield* data.items;
    }
}

 
const monitorAccess = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessing property '${prop}' with value: ${obj[prop]}`);
            return obj[prop];
        }
    });
};

 
class DataProcessor {
    constructor() {
        this.data = [];
    }

    static logMethodCalls(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            print(`Calling method: ${propertyKey} with arguments: ${args}`);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }

    @DataProcessor.logMethodCalls
    process(item) {
         
        this.data.push(item * 2);
    }
}

(async () => {
     
    const dataUrl = 'https://api.example.com/items';
    const dataProcessor = new DataProcessor();
    const monitoredProcessor = monitorAccess(dataProcessor);

    for await (const item of fetchPaginatedData(dataUrl, 3)) {
        monitoredProcessor.process(item);
    }

    print('Processed Data:', monitoredProcessor.data);
})();
