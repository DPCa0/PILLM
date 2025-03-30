(async () => {
     
    const handler = {
        get(target, prop, receiver) {
            if (typeof prop === 'symbol' || typeof target[prop] === 'function') {
                return Reflect.get(target, prop, receiver);
            }
            return `Property "${prop}" is ${target[prop]}`;
        }
    };

    const target = {
        name: 'JavaScript',
        version: 'ES2023',
        [Symbol('hidden')]: 'secret'
    };

    const proxy = new Proxy(target, handler);

    print(proxy.name);  
    print(proxy.version);  

     
    function* range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    const asyncGen = async function* (gen) {
        for (const value of gen) {
            await new Promise(resolve => setTimeout(resolve, 100));
            yield value * value;
        }
    };

    for await (const num of asyncGen(range(1, 5))) {
        print(`Squared value: ${num}`);
    }

     
    const map = new Map();
    const set = new Set();

    const obj1 = {id: 1, name: 'John'};
    const obj2 = {id: 2, name: 'Doe'};

    map.set(obj1, 'Employee');
    set.add(obj2);

    print(`Map size: ${map.size}`);  
    print(`Set has obj2: ${set.has(obj2)}`);  

     
    function highlight(strings, ...values) {
        return strings.reduce((result, str, i) => `${result}<strong>${str}</strong>${values[i] || ''}`, '');
    }

    const user = 'Alice';
    const action = 'logged in';

    print(highlight`User ${user} has ${action}`);  
})();
