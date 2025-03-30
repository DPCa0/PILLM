 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    async sayHello() {
        const greeting = await this.generateGreeting();
        print(greeting);
    }

    async generateGreeting() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
            }, 1000);
        });
    }
}

 
const personHandler = {
    get: (target, property) => {
        if (typeof target[property] === 'function') {
            return (...args) => {
                print(`Calling ${property} with arguments: ${JSON.stringify(args)}`);
                return target[property](...args);
            };
        } else {
            return target[property];
        }
    }
};

 
const john = new Proxy(new Person('John Doe', 30), personHandler);

 
(async () => {
    const ages = [25, 30, 35, 40, 45];

    const greetings = await Promise.all(ages.map(age => {
        const person = new Proxy(new Person(`Person ${age}`, age), personHandler);
        return person.sayHello();
    }));

    print('All greetings:', greetings);
})();

john.sayHello();
