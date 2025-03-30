 
class Person {
    #name;  

    constructor(name, age) {
        this.#name = name;
        this.age = age;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (typeof newName === 'string') {
            this.#name = newName;
        } else {
            throw new TypeError('Name must be a string');
        }
    }
}

 
const handler = {
    set: (obj, prop, value) => {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        obj[prop] = value;
        return true;
    }
};

const createPerson = (name, age) => {
    const person = new Person(name, age);
    return new Proxy(person, handler);
};

 
function* personGenerator(names, initialAge) {
    for (let name of names) {
        yield createPerson(name, initialAge++);
    }
}

 
async function processPeople(people) {
    const tasks = people.map(person => 
        new Promise((resolve) => {
            setTimeout(() => {
                print(`Processing ${person.name}, age ${person.age}`);
                resolve(person);
            }, 1000);
        })
    );
    const results = await Promise.all(tasks);
    print('All people processed:', results);
}

(async () => {
    const names = ['Alice', 'Bob', 'Charlie'];
    const peopleGenerator = personGenerator(names, 25);
    const people = [...peopleGenerator];
    await processPeople(people);
})();
