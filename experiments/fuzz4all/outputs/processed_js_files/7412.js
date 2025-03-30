 
const range = function* (start, end, step = 1) {
    let current = start;
    while (current < end) {
        yield current;
        current += step;
    }
};

 
const handler = {
    get(target, property) {
        print(`Accessing property "${property}"`);
        return Reflect.get(target, property);
    }
};

const targetObj = {
    name: 'Advanced JS',
    version: 'ES2020',
    features: ['Proxy', 'Generator', 'Async/Await', 'Map', 'Set']
};

const proxyObj = new Proxy(targetObj, handler);

 
const asyncOperation = async () => {
    print('Starting async operation...');
    
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    
    print('Async operation completed!');
};

 
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

const union = new Set([...setA, ...setB]);
const intersection = new Set([...setA].filter(x => setB.has(x)));
const difference = new Set([...setA].filter(x => !setB.has(x)));

 
const functionMap = new Map();
const keyFn = () => 'Hello';
functionMap.set(keyFn, 'World');

 
(async () => {
    print([...range(0, 10, 2)]);  
    
    print(proxyObj.name);  
    print(proxyObj.features[2]);  

    await asyncOperation();  

    print('Union:', [...union]);
    print('Intersection:', [...intersection]);
    print('Difference:', [...difference]);

    print('Function Map:', functionMap.get(keyFn));  
})();
