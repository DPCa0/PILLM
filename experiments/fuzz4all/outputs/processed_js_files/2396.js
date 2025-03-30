 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `Hi, I'm ${this.name}, and I'm ${this.age} years old.`;
    }
}

 
const personHandler = {
    get: function(target, property) {
        if(property === 'age') {
            return `The age of ${target.name} is classified`;
        }
        return Reflect.get(target, property);
    },
    set: function(target, property, value) {
        if(property === 'name' && typeof value !== 'string') {
            throw new Error('Name must be a string');
        }
        return Reflect.set(target, property, value);
    }
};

 
const john = new Person('John Doe', 30);
const proxiedJohn = new Proxy(john, personHandler);

 
function* delayedIterator(array, delay) {
    for (const item of array) {
        yield new Promise(resolve => setTimeout(() => resolve(item), delay));
    }
}

 
async function resolveAll(generator) {
    const promises = [...generator];
    const results = await Promise.all(promises.map(p => p.then(result => result)));
    return results;
}

 
(async () => {
    print(proxiedJohn.introduce());
    print(proxiedJohn.age);
    
    const delayedValues = delayedIterator([1, 2, 3, 4, 5], 1000);
    const results = await resolveAll(delayedValues);
    print('Delayed results:', results);
})();
