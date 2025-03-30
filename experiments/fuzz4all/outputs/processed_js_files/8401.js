 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting value of ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting value of ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

let data = {
    name: 'Alice',
    age: 30
};

let proxy = new Proxy(data, handler);

 
print(proxy.name);  
proxy.age = 31;  

 
async function fetchData() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    
    try {
        const results = await Promise.all(promises);
        print('Fetched data:', results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generateID = idGenerator();

print(generateID.next().value);  
print(generateID.next().value);  
print(generateID.next().value);  

 
(function({ greeting = 'Hello', name = 'World' } = {}) {
    print(`${greeting}, ${name}!`);
})({ greeting: 'Hi', name: 'JavaScript' });

 
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        print(`${this.name} barks.`);
    }
}

let dog = new Dog('Rex');
dog.speak();  
