 
const personHandler = {
    set(target, property, value) {
        if (property === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('Age must be an integer');
            }
            if (value < 0) {
                throw new RangeError('Age cannot be negative');
            }
        }
        return Reflect.set(target, property, value);
    }
};

const createPerson = (name, age) => {
    const person = { name, age };
    return new Proxy(person, personHandler);
};

const fetchData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 30 });
        }, 1000);
    });
};

(async () => {
    try {
        const { name, age } = await fetchData();
        const person = createPerson(name, age);

        print(`Name: ${person.name}, Age: ${person.age}`);  

        person.age = 25;  
        print(`Updated Age: ${person.age}`);

        person.age = -5;  
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
