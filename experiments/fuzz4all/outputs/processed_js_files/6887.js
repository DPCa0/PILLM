 
const simulateApiCall = (data) => new Promise(resolve => setTimeout(() => resolve(data), 1000));

 
async function* fetchDataGenerator() {
    const apiData = await simulateApiCall(['Data 1', 'Data 2', 'Data 3']);
    for (const item of apiData) {
        yield item;
    }
}

 
const createLoggingProxy = (target) => new Proxy(target, {
    get: (obj, prop) => {
        print(`Getting property ${String(prop)}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property ${String(prop)} to ${value}`);
        obj[prop] = value;
        return true;
    }
});

 
(async () => {
     
    const user = createLoggingProxy({ name: 'John Doe', age: 30 });

     
    print(user.name);
    user.age = 31;

     
    const fetchData = fetchDataGenerator();
    for await (const data of fetchData) {
        print('Fetched:', data);
    }

     
    const config = { timeout: 5000 };
    const timeout = config?.timeout ?? 3000;
    print('Configured timeout:', timeout);

     
    if (Math.random() > 0.5) {
        const { dynamicFeature } = await import('./dynamicModule.js');
        dynamicFeature();
    } else {
        print('Dynamic import was skipped.');
    }
})();

*Note: Ensure that `./dynamicModule.js` file exists and exports a `dynamicFeature` function for the dynamic import to work correctly.*