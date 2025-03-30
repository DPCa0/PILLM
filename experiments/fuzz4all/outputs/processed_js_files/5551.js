class Person {
    #privateSecret = "I love JavaScript!";
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    static fromData({ name, age }) {
        return new Person(name, age);
    }
    
    async celebrateBirthday() {
        print(`Happy Birthday ${this.name}!`);
        await this.#delay(1000);  
        this.age++;
        print(`You are now ${this.age} years old.`);
    }
    
    #delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    revealSecret() {
        return this.#privateSecret;
    }
}

function* fibonacci(limit) {
    let [prev, current] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, current] = [current, prev + current];
        yield current;
    }
}

const dynamicImport = (async () => {
    if (Math.random() > 0.5) {
        const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.default.js');
        print('Lodash is dynamically imported', _.random(0, 100));
    } else {
        print('Skipped Lodash import this time.');
    }
})();

const personData = { name: 'Alice', age: 29 };
const alice = Person.fromData(personData);
alice.celebrateBirthday().then(() => print(alice.revealSecret()));

print("Fibonacci sequence:");
for (const num of fibonacci(5)) {
    print(num);
}
