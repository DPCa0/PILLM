 

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get ageInDays() {
        return this.age * 365;
    }

    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

const asyncOperation = async () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched successfully!');
        }, 2000);
    });

    const result = await promise;
    print(result);
};

const createProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            if (prop in obj) {
                print(`Getting property: ${prop}`);
                return obj[prop];
            } else {
                console.warn(`Property ${prop} does not exist!`);
            }
        },
        set: (obj, prop, value) => {
            print(`Setting property: ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
};

const john = new Person('John', 30);
const proxiedJohn = createProxy(john);

print(proxiedJohn.greet());
proxiedJohn.age = 31;
print(proxiedJohn.ageInDays);

 
function* numberGenerator() {
    let number = 0;
    while (true) {
        yield number++;
    }
}

const numbers = numberGenerator();
print(numbers.next().value);  
print(numbers.next().value);  
print(numbers.next().value);  

 
const uniqueNumbers = new Set([1, 2, 3, 4, 4, 5]);
print('Unique Numbers:', [...uniqueNumbers]);

const phoneBook = new Map();
phoneBook.set('John', '555-1234');
phoneBook.set('Jane', '555-5678');

for (let [name, number] of phoneBook) {
    print(`${name}: ${number}`);
}

 
asyncOperation();
