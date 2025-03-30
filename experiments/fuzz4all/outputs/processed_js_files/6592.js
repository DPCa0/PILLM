 

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

 
function createMultiplier(multiplier) {
    return function(x) {
        return x * multiplier;
    };
}

 
function logDogDetails({name, age, breed, ...rest}) {
    console.log(`Dog Details:
    Name: ${name}
    Age: ${age}
    Breed: ${breed}
    Additional Info: ${JSON.stringify(rest, null, 2)}`);
}

const dog = new Dog('Rex');
dog.age = 5;
dog.breed = 'German Shepherd';

 
const fetchDogData = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    print(`Random Dog Image: ${data.message}`);
};

 
(async () => {
    dog.speak();

    const double = createMultiplier(2);
    print(`Double of 5 is: ${double(5)}`);

    logDogDetails({...dog, color: 'Brown', friendly: true});

    try {
        await fetchDogData();
    } catch (error) {
        console.error('Failed to fetch dog data:', error);
    }
})();
