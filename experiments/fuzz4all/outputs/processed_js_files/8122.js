class Person {
    #privateData = "This is private";

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    static fromObject({ name, age }) {
        return new Person(name, age);
    }

    #calculateBirthYear() {
        return new Date().getFullYear() - this.age;
    }

    get privateInfo() {
        return this.#privateData;
    }

    greet() {
        print(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }

    showBirthYear() {
        print(`I was born in ${this.#calculateBirthYear()}.`);
    }
}

const proxyHandler = {
    get(target, prop, receiver) {
        if (prop === 'secret') {
            return 'Intercepted secret data!';
        }
        return Reflect.get(...arguments);
    }
};

function getDataAsync() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ name: 'Alice', age: 30 }), 1000);
    });
}

async function main() {
    const data = await getDataAsync();
    const person = Person.fromObject(data);

    const personProxy = new Proxy(person, proxyHandler);
    
    personProxy.greet();
    personProxy.showBirthYear();
    print(personProxy.privateInfo);
    print(personProxy.secret);
}

main();
