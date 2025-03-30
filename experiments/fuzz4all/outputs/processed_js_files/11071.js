class Person {
    #age;  
    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }

    getAge() {
        return this.#age;
    }

    static async fetchRandomUser() {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        return new Person(data.results[0].name.first, data.results[0].dob.age);
    }
}

function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

(async () => {
    const person = await Person.fetchRandomUser();
    print(`Random Person: ${person.name}, Age: ${person.getAge()}`);

    const fibonacci = fibonacciGenerator();
    print('Fibonacci Sequence:');
    for (const number of Array.from({ length: 10 }, () => fibonacci.next().value)) {
        print(number);
    }
})();

const double = x => x * 2;

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(double);

print('Doubled Numbers:', doubledNumbers);

const complexObject = {
    foo: {
        bar: {
            baz: 42,
            func: () => 'Hello, World!',
        }
    }
};

const {
    foo: {
        bar: { baz, func }
    }
} = complexObject;

print('Destructured Value:', baz);
print('Function Call:', func());
