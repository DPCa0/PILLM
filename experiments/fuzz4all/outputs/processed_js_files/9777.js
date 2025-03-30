class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        print(`${this.name} barks.`);
    }
}

function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

(async () => {
    const dog = new Dog("Rex");
    dog.speak();

    print('Fibonacci sequence:');
    for (const num of fibonacci(5)) {
        print(num);
    }

    const isEven = num => new Promise((resolve) => {
        setTimeout(() => resolve(num % 2 === 0), 1000);
    });

    const numbers = [1, 2, 3, 4, 5];
    const results = await Promise.all(numbers.map(async (num) => {
        const even = await isEven(num);
        return `${num} is ${even ? 'even' : 'odd'}`;
    }));

    print('Number checks:');
    results.forEach(result => print(result));
})();
