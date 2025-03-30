class Person {
    #name;  
    constructor(name, age) {
        this.#name = name;
        this.age = age;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        this.#name = newName;
    }

    static greet() {
        print('Greetings from the Person class!');
    }

    *ageGenerator(maxAge) {
        let currentAge = this.age;
        while (currentAge <= maxAge) {
            yield currentAge++;
        }
    }
}

const p1 = new Person('Alice', 30);
const ages = p1.ageGenerator(35);

print([...ages]);  

const asyncOp = async () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Async operation complete!');
        }, 1000);
    });

    try {
        const result = await promise;
        print(result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const proxyHandler = {
    get: (target, prop) => {
        print(`Accessing property ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const proxiedPerson = new Proxy(p1, proxyHandler);

Person.greet();
print(proxiedPerson.name);
proxiedPerson.age = 31;
asyncOp();
