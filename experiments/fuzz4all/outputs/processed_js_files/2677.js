 

 
async function* asyncNumberGenerator() {
    let i = 1;
    while (i <= 5) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
    get: (target, property, receiver) => {
        print(`Getting ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set: (target, property, value, receiver) => {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};
const proxyObject = new Proxy(targetObject, handler);

 
function highlight(strings, ...values) {
    return strings.reduce((prev, curr, i) => `${prev}<em>${values[i - 1]}</em>${curr}`);
}

const name = "JavaScript";
const sentence = highlight`This is a complex ${name} program.`;

 
const uniqueKey = Symbol('unique');
const mySet = new Set([1, 2, 3, uniqueKey, 5]);

 
class Counter {
    #count = 0;
    increment() {
        this.#count++;
    }
    get count() {
        return this.#count;
    }
}

 
(async () => {
    print(sentence);

    proxyObject.a = 10;
    print(proxyObject.b);

    const counter = new Counter();
    counter.increment();
    print(`Counter: ${counter.count}`);

    print('Values from async generator:');
    for await (let num of asyncNumberGenerator()) {
        print(num);
    }

    print('Set elements:');
    for (let item of mySet) {
        print(item);
    }
})();
