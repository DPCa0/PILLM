class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        super.speak();
        print(`${this.name} barks.`);
    }
}

const describe = (animal) => {
    const { name, breed } = animal;
    return `This is ${name} and it's a ${breed}.`;
};

const main = async () => {
    const fetchBreed = () => new Promise((resolve) => setTimeout(() => resolve('Labrador'), 1000));

    const dogBreed = await fetchBreed();
    const myDog = new Dog('Rex', dogBreed);

    print(describe(myDog));
    myDog.speak();
};

const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
};

const throttledLog = debounce(() => print('Function executed after delay!'), 2000);

main();

window.addEventListener('resize', throttledLog);
