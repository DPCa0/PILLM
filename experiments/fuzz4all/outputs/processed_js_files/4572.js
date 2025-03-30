class Person {
    #age;  

    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }

    greet() {
        print(`Hello, my name is ${this.name} and I am ${this.#age} years old.`);
    }

    static fromJSON(json) {
        const { name, age } = JSON.parse(json);
        return new Person(name, age);
    }
}

function* fibonacci(limit) {
    let [prev, current] = [0, 1];
    while (current < limit) {
        [prev, current] = [current, prev + current];
        yield current;
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Data fetched'), 1000);
    });
}

 
(async () => {
    const data = await fetchData();
    print(data);

    const john = Person.fromJSON('{"name": "John", "age": 30}');
    john.greet();

    print('Fibonacci sequence up to 100:');
    for (const num of fibonacci(100)) {
        print(num);
    }
})();
