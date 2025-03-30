class Animal {
    #name;  
    constructor(name) {
        this.#name = name;
    }
    speak() {
        print(`${this.#name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        super.speak();
        print(`${this.getName()} barks.`);
    }
    getName() {
        return Reflect.get(this, '#name');
    }
}

 
function logMethod(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        print(`Calling ${key} with`, args);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

class Calculator {
    @logMethod
    add(a, b) {
        return a + b;
    }
    @logMethod
    subtract(a, b) {
        return a - b;
    }
}

const max = new Dog('Max');
max.speak();

const calc = new Calculator();
print('Add result:', calc.add(5, 7));
print('Subtract result:', calc.subtract(10, 4));

 
const asyncOperation = (value) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value > 5) {
                resolve('Success!');
            } else {
                reject(new Error('Failure!'));
            }
        }, 1000);
    });

(async function() {
    try {
        const result = await asyncOperation(6);
        print(result);
    } catch (error) {
        console.error(error);
    }
})();
