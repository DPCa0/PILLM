 
class Person {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    #getYearOfBirth() {
        return new Date().getFullYear() - this.#age;
    }

    get introduction() {
        return `Hello, my name is ${this.#name} and I was born in ${this.#getYearOfBirth()}.`;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'introduction') {
            return Reflect.get(target, prop, receiver) + " I'm using advanced JavaScript features!";
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
async function* asyncGenerator(array) {
    for (const item of array) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield item;
    }
}

(async () => {
    const person = new Proxy(new Person('Alice', 30), handler);
    print(person.introduction);

     
    const array = ['JavaScript', 'Node.js', 'React'];
    for await (const tech of asyncGenerator(array)) {
        print(`Learning about ${tech}`);
    }

     
    const promises = [
        Promise.resolve('Success'),
        Promise.reject('Error'),
        Promise.resolve('Another success')
    ];

    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
        print(`Promise ${index}: ${result.status}`);
    });
})();
