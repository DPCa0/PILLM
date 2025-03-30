 
class Person {
    #privateAge = 0;  

    constructor(name, age) {
        this.name = name;
        this.#privateAge = age;
    }

    get age() {
        return this.#privateAge;
    }

    set age(value) {
        if (value < 0) {
            throw new Error("Age cannot be negative.");
        }
        this.#privateAge = value;
    }

    greet() {
        print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Fetched Data' }), 1000);
    });
}

 
(async () => {
    const data = await fetchData();
    print(data);

     
    const promises = [
        fetchData(),
        fetchData(),
        fetchData()
    ];
    const results = await Promise.all(promises);
    print(results);

     
    const person = new Person('Alice', 30);

     
    const highlight = (strings, ...values) => {
        return strings.reduce((result, string, i) => {
            const value = values[i] ? `<strong>${values[i]}</strong>` : '';
            return result + string + value;
        }, '');
    };

    print(highlight`Welcome ${person.name} to the JavaScript world!`);

     
    person.greet()
        .age = 31;
    person.greet();

     
    const numbers = [1, 2, 3, 4, 5];
    const newNumbers = numbers.map(n => n * 2).filter(n => n > 5);
    print(newNumbers);

     
    const handler = {
        get: (target, property) => {
            if (property === 'age') {
                return `${target[property]} years old`;
            }
            return target[property];
        }
    };

    const proxiedPerson = new Proxy(person, handler);
    console.log