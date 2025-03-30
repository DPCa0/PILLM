 
(async function() {
    const _ = await import('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');

     
    const targetObject = {
        message: "Hello, world!",
        count: 0
    };

    const handler = {
        get(target, prop) {
            print(`Property '${prop}' accessed: ${target[prop]}`);
            return target[prop];
        },
        set(target, prop, value) {
            print(`Property '${prop}' set to: ${value}`);
            target[prop] = value;
            return true;
        }
    };

    const reactiveObject = new Proxy(targetObject, handler);

     
    const myMap = new Map();
    const uniqueKey = Symbol('unique');

    myMap.set(uniqueKey, 'Some unique value');
    print(`Unique value in map: ${myMap.get(uniqueKey)}`);

     
    const clonedObject = _.cloneDeep(reactiveObject);
    print('Cloned object:', clonedObject);

     
    async function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => resolve("Data fetched successfully"), 1000);
        });
    }

    print(await fetchData());

     
    print(reactiveObject.message);
    reactiveObject.count += 1;
    reactiveObject.message = "Hello, advanced JavaScript!";
})();
