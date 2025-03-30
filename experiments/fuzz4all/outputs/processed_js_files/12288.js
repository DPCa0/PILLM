 
const handler = {
    get: function(target, property, receiver) {
        if (property in target) {
            print(`Getting property "${property}": ${target[property]}`);
            return Reflect.get(target, property, receiver);
        } else {
            throw new ReferenceError(`Property "${property}" does not exist.`);
        }
    },
    set: function(target, property, value) {
        print(`Setting property "${property}" to ${value}`);
        return Reflect.set(target, property, value);
    }
};

const target = {
    name: "JavaScript",
    level: "Advanced"
};

const proxy = new Proxy(target, handler);

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        let data = await response.json();
        print("Fetched Data: ", data);
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

 
proxy.name = "ECMAScript";
print(proxy.name);

fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
function* numberGenerator() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

const generator = numberGenerator();

proxy.generatedNumber = generator.next().value;  
print(proxy.generatedNumber);  

 
const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
]);

const objFromMap = Object.fromEntries(map);
print({...objFromMap});
