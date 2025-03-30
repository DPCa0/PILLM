(async () => {
     
    const complexAsyncFunction = async (num) => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
        return num * 2;
    };

    const complexGeneratorFunction = function* (arr) {
        for (const item of arr) {
            yield complexAsyncFunction(item);
        }
    };

     
    const person = { name: 'John Doe', age: 30 };
    const handler = {
        get: (target, prop) => {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop);
        },
        set: (target, prop, value) => {
            print(`Setting property ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    };
    const proxiedPerson = new Proxy(person, handler);

     
    print(`Name: ${proxiedPerson.name}`);
    proxiedPerson.age = 31;

    const numbers = [1, 2, 3, 4, 5];
    const results = [];

    for (const promise of complexGeneratorFunction(numbers)) {
        results.push(await promise);
    }

    print('Doubled numbers:', results);

     
    const uniqueNumbers = new Set([1, 2, 2, 3, 4, 5]);
    const mappedResults = new Map(results.map((num, i) => [i, num]));

    print('Unique numbers:', [...uniqueNumbers]);
    print('Mapped Results:', mappedResults);

     
    const privateDataKey = Symbol('privateData');
    const privateDataStore = new WeakMap();

    const privateObject = {};
    privateDataStore.set(privateObject, { [privateDataKey]: 'Sensitive Data' });

    print('Access Private Data:', privateDataStore.get(privateObject)[privateDataKey]);
})();
