 
const _name = new WeakMap();
const _age = new WeakMap();

class Person {
    constructor(name, age) {
        _name.set(this, name);
        _age.set(this, age);
    }

    get name() {
        return _name.get(this);
    }

    get age() {
        return _age.get(this);
    }

    greet() {
        print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

 
const createValidatedPerson = (name, age) => {
    const person = new Person(name, age);
    return new Proxy(person, {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            } else {
                throw new ReferenceError(`Property ${prop} does not exist.`);
            }
        },
        set(target, prop, value) {
            if (prop === 'name' || prop === 'age') {
                throw new TypeError('Cannot set readonly property.');
            }
            target[prop] = value;
            return true;
        }
    });
};

 
function* personGenerator(names) {
    for (const name of names) {
        yield createValidatedPerson(name, Math.floor(Math.random() * 100));
    }
}

 
const fetchData = async () => {
    return new Promise(resolve => setTimeout(() => resolve(['Alice', 'Bob', 'Charlie']), 1000));
};

(async () => {
     
    const names = await fetchData();
    const peopleGen = personGenerator(names);

    for (let person of peopleGen) {
        person.greet();  
    }
})();
