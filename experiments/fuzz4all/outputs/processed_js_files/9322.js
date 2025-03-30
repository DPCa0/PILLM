 
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
(async () => {
     
    const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);

     
    const target = { num1: 10, num2: 20 };
    const handler = {
        get: (obj, prop) => {
            print(`Accessed property: ${prop}`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Set property ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    };
    const proxy = new Proxy(target, handler);

     
    const map = new Map();
    const weakMap = new WeakMap();
    const obj = {};

    map.set('key1', 'value1');
    weakMap.set(obj, 'This is a weakly-held object');

     
    print(map.get('key1'));
    print(weakMap.get(obj));

     
    const sym = Symbol('unique');
    const myObj = {
        [sym]: 'Symbol value',
        regularKey: 'Regular value'
    };
    print(myObj[sym]);

     
    class MyClass {
        #privateField = 42;

        #privateMethod() {
            return `The meaning of life is ${this.#privateField}`;
        }

        publicMethod() {
            print(this.#privateMethod());
        }
    }

    const instance = new MyClass();
    instance.publicMethod();

     
    const { default: moduleData } = await import('./someModule.js');

     
    const numbers = [1, 2, 3, 4, 5];
    const squared = numbers.map((n) => n ** 2);
    print('Squared numbers:', squared);

     
    try {
        await wait(1000);
        print('Waited for 1 second');
    } catch (