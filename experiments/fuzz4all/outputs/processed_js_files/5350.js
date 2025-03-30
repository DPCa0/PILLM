 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} does not exist`);
            return null;
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { name: "JavaScript", version: "ES6" };
const proxyObject = new Proxy(targetObject, handler);

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

 
async function processData() {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        print('Fetched Data:', data);

         
        print('Version:', proxyObject.version);
        proxyObject.language = 'Dynamic';
        print('Language:', proxyObject.language);
        
         
        const gen = numberGenerator();
        print('Generated Numbers:', gen.next().value, gen.next().value, gen.next().value);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
processData();
