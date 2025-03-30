class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        super.speak();
        print(`${this.name} barks.`);
    }
}

const makePromise = async (message, delay) => {
    return new Promise(resolve => setTimeout(() => resolve(message), delay));
}

(async () => {
    const dog = new Dog('Rex', 'Labrador');
    dog.speak();

    const [msg1, msg2] = await Promise.all([
        makePromise('Hello from promise 1', 1000),
        makePromise('Hello from promise 2', 2000)
    ]);

    print(msg1, msg2);

    const data = { name: "Alice", age: 30, location: "Wonderland" };
    const handler = {
        get(target, prop) {
            return prop in target ? target[prop] : `Property ${prop} is not available`;
        }
    };

    const proxy = new Proxy(data, handler);
    print(proxy.name);
    print(proxy.nonExistentProp);

    const generateNumbers = function*() {
        let i = 0;
        while (true) {
            yield i++;
        }
    };

    const numbers = generateNumbers();
    print(numbers.next().value);  
    print(numbers.next().value);  
    print(numbers.next().value);  

    const doubleMap = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
    ]);

    const doubledValues = new Map([...doubleMap].map(([k, v]) => [k * 2, v.toUpperCase()]));
    print([...doubledValues]);  
})();
