 

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const data = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function fetchData() {
    print('Fetching data...');
    return new Promise(resolve => setTimeout(() => resolve({ info: 'Some data from server' }), 1000));
}

(async function() {
    const response = await fetchData();
    print(response.info);
})();

 
const config = { host: 'localhost', port: 8080, path: '/api' };
const { host, ...rest } = config;
print(host, rest);

 
function* idGenerator() {
    let id = 0;
    while(true) {
        yield ++id;
    }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        print(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    speak() {
        super.speak();
        print(`${this.name} barks`);
    }
}

const d = new Dog('Rover');
d.speak();  
            

 
function tag(strings, ...values) {
    print(strings, values);
}

const person = 'John';
const action = 'coding';
tag`${person} is ${action}`;
