class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        print(`${this.name} makes a sound.`);
    }
}

class Dog extends Animal {
    speak() {
        super.speak();
        print(`${this.name} barks.`);
    }
}

const runAsyncTasks = async () => {
    const fetchData = () => new Promise((resolve) => {
        setTimeout(() => resolve('Data fetched'), 1000);
    });

    const data = await fetchData();
    print(data);
};

const main = async () => {
    const dog = new Dog('Rex');
    dog.speak();

    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2);
    print('Doubled:', doubled);

    const [first, ...rest] = numbers;
    print('First:', first, 'Rest:', rest);

    const reducer = (acc, curr) => acc + curr;
    print('Sum:', numbers.reduce(reducer, 0));

    const filtered = numbers.filter(n => n > 2);
    print('Filtered:', filtered);

    await runAsyncTasks();
};

main();
