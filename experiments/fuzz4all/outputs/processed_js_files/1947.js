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

    static createRandomDog() {
        const breeds = ['Beagle', 'Bulldog', 'Poodle', 'Labrador'];
        const names = ['Max', 'Charlie', 'Buddy', 'Cooper'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
        return new Dog(randomName, randomBreed);
    }
}

const randomDog = Dog.createRandomDog();
randomDog.speak();

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const targetObject = {
    firstName: 'John',
    lastName: 'Doe'
};

const handler = {
    get(target, prop) {
        print(`Accessed property: ${prop}`);
        return prop in target ? target[prop] : `Property '${prop}' not found.`;
    }
};

const proxyObject = new Proxy(targetObject, handler);

print(proxyObject.firstName);
print(proxyObject.age);

 
fetchData('https://api.example.com/data');
