 
class Person {
    #name;  
    static #count = 0;  

    constructor(name) {
        this.#name = name;
        Person.#count++;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        this.#name = newName;
    }

    static get count() {
        return Person.#count;
    }

     
    greet() {
        print(`Hello, my name is ${this.#name}.`);
    }
}

 
function logExecution(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        print(`Executing ${propertyKey} with arguments: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property ${prop} does not exist on target`);
        }
    }
};

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr < limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const john = new Person('John');
const proxiedPerson = new Proxy(john, handler);

proxiedPerson.greet();
print(`Total people created: ${Person.count}`);

for (let num of fibonacci(50)) {
    print(num);
}

 
class MathOperations {
    @logExecution
    static sum(a, b) {
        return a + b;
    }
}

print(`Sum: ${MathOperations.sum(5, 10)}`);
