 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* generateNumbers() {
    for (let i = 1; i <= 5; i++) {
        yield delay(1000).then(() => i);
    }
}

 
async function processNumbers(gen) {
    for await (let num of gen()) {
        print(`Processing number: ${num}`);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' accessed`);
        return prop in target ? target[prop] : 'Property does not exist';
    }
};

const data = new Proxy({foo: 'bar', baz: 42}, handler);

 
print(data.foo);   
print(data.nonExistent);   
processNumbers(generateNumbers);   
