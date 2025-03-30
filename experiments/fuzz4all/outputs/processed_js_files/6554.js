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
        print(`${this.name} barks.`);
    }
}

const asyncOperation = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve("Fetched data"), 1000);
});

async function fetchData() {
    try {
        let result = await asyncOperation();
        print(result);
    } catch (error) {
        console.error(error);
    }
}

const applyMixin = (derivedCtor, baseCtors) => {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
};

class Flying {
    fly() {
        print(`${this.name} is flying.`);
    }
}

class Swimming {
    swim() {
        print(`${this.name} is swimming.`);
    }
}

class SuperAnimal extends Animal {}

applyMixin(SuperAnimal, [Flying, Swimming]);

const myDog = new Dog("Rex", "Labrador");
const superAnimal = new SuperAnimal("Griffin");

myDog.speak();  
fetchData();    
superAnimal.fly();    
superAnimal.swim();   
