 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function logCalls(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        print(`Calling ${propertyKey} with`, args);
        const result = originalMethod.apply(this, args);
        print(`Result from ${propertyKey}:`, result);
        return result;
    };
    return descriptor;
}

 
const person = new Proxy({}, {
    get: (obj, prop) => obj[prop] || `Property ${prop} does not exist`,
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
});

class AdvancedFeaturesDemo {
     
    static #instanceCount = 0;

    constructor(name) {
        this.name = name;
        AdvancedFeaturesDemo.#instanceCount++;
    }

     
    @logCalls
    greet(greeting = "Hello") {
        return `${greeting}, ${this.name}!`;
    }

    static getInstanceCount() {
        return AdvancedFeaturesDemo.#instanceCount;
    }

     
    async simulateWork() {
        print("Simulating work...");
        await delay(1000);
        print("Work done!");
    }
}

 
async function main() {
    const demo1 = new AdvancedFeaturesDemo("Alice");
    print(demo1.greet("Hi"));

    const demo2 = new AdvancedFeaturesDemo("Bob");
    print(demo2.greet());

    print(`Instance count: ${AdvancedFeaturesDemo.getInstanceCount()}`);

    await demo1.simulateWork();

     
    person.name = "Charlie";
    print(person.name);
    print(person.age);
}

main();
