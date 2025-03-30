 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 28 },
                { id: 2, name: 'Bob', age: 23 },
                { id: 3, name: 'Charlie', age: 33 }
            ]);
        }, 1000);
    });
};

 
async function processData() {
    try {
        const data = await fetchData();
        const over30 = data.filter(person => person.age > 30);

        print('People over 30:', over30);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
class Person {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    
    get info() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

 
const loggerHandler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

 
const bob = new Proxy(new Person(2, 'Bob', 23), loggerHandler);

 
print(bob.info);   
bob.age = 24;            

 
(async () => {
    print('Processing data...');
    await processData();
})();
