 
class Person {
     
    #age;
    
    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }
    
     
    #formatName() {
        return `Mr./Ms. ${this.name}`;
    }

     
    getInfo() {
        return `${this.#formatName()} is ${this.#age} years old.`;
    }
}

 
const handler = {
    get: function(target, property, receiver) {
        const origMethod = target[property];
        return function(...args) {
            print(`Method ${property} was called`);
            return origMethod.apply(this, args);
        };
    }
};

const john = new Person('John Doe', 30);
const proxyJohn = new Proxy(john, handler);

print(proxyJohn.getInfo());

 
(async () => {
    const fetchData = (url) => new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });

    try {
        const data = await fetchData('https://example.com');
        print(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
