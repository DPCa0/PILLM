 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }

    static compareAges(person1, person2) {
        return person1.age - person2.age;
    }
}

 
const handler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

 
const people = new Set();
const ageMap = new Map();

 
let alice = new Person('Alice', 30);
let bob = new Person('Bob', 25);

 
alice = new Proxy(alice, handler);
bob = new Proxy(bob, handler);

 
people.add(alice);
people.add(bob);

 
people.forEach(person => ageMap.set(person.name, person.age));

 
for (const [name, age] of ageMap) {
    print(`${name} is ${age} years old.`);
}

 
people.forEach(person => print(person.greet()?.toUpperCase()));

 
const olderPerson = Person.compareAges(alice, bob) > 0 ? alice : bob;
print(`${olderPerson?.name} is older.`);
