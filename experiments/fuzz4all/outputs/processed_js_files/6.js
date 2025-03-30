 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        } else {
            print(`${property} does not exist`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { a: 1, b: 2 };

 
const proxy = new Proxy(targetObject, handler);

 
proxy.a;            
proxy.b = 42;       
proxy.c = proxy.a;  
print(proxy.c);  

 
function* numberGenerator() {
    yield 10;
    yield 20;
    yield 30;
}

const [first, second, ...rest] = numberGenerator();
print(first, second, rest);  

 
class AdvancedFeatures {
    #privateField = 'Private Value';

    constructor(publicField) {
        this.publicField = publicField;
    }

    #privateMethod() {
        return `Accessed private method: ${this.#privateField}`;
    }

    accessPrivateMethod() {
        return this.#privateMethod();
    }
}

const advanced = new AdvancedFeatures('Public Value');
print(advanced.publicField);  
print(advanced.accessPrivateMethod());  

 
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();  

 