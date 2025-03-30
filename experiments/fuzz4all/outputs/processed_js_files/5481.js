 

class Animal {
    #name;  
    constructor(name) {
        this.#name = name;
    }
    getName() {
        return this.#name;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function simulateAnimalLife() {
    const animals = ["Lion", "Tiger", "Bear"].map(name => new Animal(name));

    print("Simulating animal life...");
    for await (const animal of asyncGenerator(animals)) {
        print(`Animal: ${animal.getName()}`);
        await delay(1000);
    }
}

async function* asyncGenerator(items) {
    for (const item of items) {
        yield delay(500).then(() => item);
    }
}

const mapPromise = new Map();
mapPromise.set('key1', delay(300).then(() => 'value1'));

Promise.all([...mapPromise.values()]).then(values => {
    print("Map values resolved:", values);
});

simulateAnimalLife();
