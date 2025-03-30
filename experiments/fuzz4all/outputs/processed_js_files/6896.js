 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

     
    *ageIterator() {
        for (let i = 0; i <= this.age; i++) {
            yield i;
        }
    }

     
    async getData() {
        const fetchData = () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Data for ${this.name}`);
            }, 1000);
        });

        try {
            const data = await fetchData();
            print(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

     
    displayInfo() {
        const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');
        const message = capitalize`Name: ${this.name}, Age: ${this.age}`;
        print(message);
    }
}

 
const personHandler = {
    get: (target, prop) => {
        if (prop === 'name') {
            return `Mr./Ms. ${target[prop]}`;
        }
        return target[prop];
    }
};

 
const john = new Person('John', 30);

 
const proxiedJohn = new Proxy(john, personHandler);

 
const personData = new WeakMap();
personData.set(john, { occupation: 'Developer', hobby: 'Cycling' });

 
john.displayInfo();
john.getData();

 
const ageGen = john.ageIterator();
for (const age of ageGen) {
    print(`Age ${age}`);
}

 
print(`Proxied Name: ${proxiedJohn.name}`);

 
print(`Occupation: ${personData.get(john).occupation}, Hobby: ${personData.get(john).hobby}`);
