 
class Person {
    #age;
    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }
    
    get info() {
        return `${this.name} is ${this.#age} years old.`;
    }
    
    celebrateBirthday() {
        this.#age++;
        return this.#age;
    }
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' accessed`);
        return property in target ? target[property] : 'Property not found';
    }
};

const john = new Person("John", 30);
const proxiedJohn = new Proxy(john, handler);

print(proxiedJohn.name);
print(proxiedJohn.info);
print(proxiedJohn.celebrateBirthday());

 
function displayPerson({name, age = 18} = {}) {
    print(`${name} is ${age} years old.`);
}

displayPerson({ name: "Alice", age: 25 });
displayPerson({ name: "Bob" });  

 
fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
        if (data) {
            print('Fetched data:', data);
        }
    });
