 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
     
    incrementAge(years = 1) {
        this.age += years;
    }
    
     
    static compareAges(person1, person2) {
        return person1.age - person2.age;
    }
}

 
const handler = {
    get(target, property) {
        if (property === 'info') {
            return `Name: ${target.name}, Age: ${target.age}`;
        }
        return Reflect.get(...arguments);
    }
};

 
let person = new Person('Alice', 30);
let personProxy = new Proxy(person, handler);

 
async function updateAge(person) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            person.incrementAge();
            resolve(person.age);
        }, 1000);
    });
    let newAge = await promise;
    print(`Updated Age: ${newAge}`);
}

 
let persons = new Map();
persons.set('Alice', personProxy);
persons.set('Bob', new Proxy(new Person('Bob', 25), handler));

 
print([...persons.values()].map(p => p.info).join('; '));

 
updateAge(personProxy);

 
function* personGenerator(map) {
    for (let person of map.values()) {
        yield person;
    }
}

 
for (let p of personGenerator(persons)) {
    print(`Generated: ${p.info}`);
}
