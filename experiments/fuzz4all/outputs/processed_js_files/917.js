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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function randomDelaySpeak(animals) {
    for (const animal of animals) {
        await delay(Math.random() * 1000);
        animal.speak();
    }
}

const dog1 = new Dog('Rex');
const dog2 = new Dog('Buddy');
const genericAnimal = new Animal('Unknown');

const animals = [dog1, dog2, genericAnimal];

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting the ${prop} property`);
        return Reflect.get(...arguments);
    }
};

const proxiedAnimals = new Proxy(animals, handler);

 
function* animalNames(animals) {
    for (let animal of animals) {
        yield animal.name;
    }
}

(async () => {
    print([...animalNames(proxiedAnimals)]);
    await randomDelaySpeak(proxiedAnimals);
})();
