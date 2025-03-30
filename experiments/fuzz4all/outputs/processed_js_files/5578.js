(async function advancedFeaturesDemo() {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
     
    const [first, ...rest] = [10, 20, 30, 40, 50];
    print(`First: ${first}, Rest: ${rest}`);

     
    const handler = {
        get(target, property) {
            print(`Getting ${property}`);
            return target[property];
        },
        set(target, property, value) {
            print(`Setting ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    };

    const reactiveObject = new Proxy({name: 'JavaScript'}, handler);
    print(reactiveObject.name);
    reactiveObject.version = 2023;

     
    const privateField = Symbol('privateField');
    class AdvancedClass {
        constructor() {
            this[privateField] = 'secret';
        }
        revealSecret() {
            print(`The secret is: ${this[privateField]}`);
        }
    }

    const instance = new AdvancedClass();
    instance.revealSecret();

     
    function* fibonacci(n) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < n; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    print('First 5 Fibonacci numbers:');
    for (const num of fibonacci(5)) {
        print(num);
    }

     
    const mySet = new Set([1, 2, 3, 4, 5]);
    const myMap = new Map([['a', 1], ['b', 2], ['c', 3]]);

    print('Set values:');
    mySet.forEach(value => print(value));

    print('Map entries:');
    for (const [key, value] of myMap) {
        print(`${key}: ${value}`);
    }

     
    function taggedTemplate(strings, ...values) {
        return strings.map((str, i) => `${str