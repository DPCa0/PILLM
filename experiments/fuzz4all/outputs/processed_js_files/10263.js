class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(person) {
    let i = 0;
    while (i < 3) {
        await delay(1000);
        yield `${person.greet()} This is message ${++i}`;
    }
}

(async () => {
    const p1 = new Person('Alice', 30);
    const p2 = new Person('Bob', 25);
    const allGreetings = [p1, p2].map(person => asyncGenerator(person));

    for await (const generator of allGreetings) {
        for await (const msg of generator) {
            print(msg);
        }
    }
})();
