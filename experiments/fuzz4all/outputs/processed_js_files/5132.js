 

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield new Promise(resolve => setTimeout(() => resolve(num++), 1000));
    }
}

 
async function printNumbers(generator) {
    for await (let num of generator) {
        print(num);
        if (num > 5) break;  
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return prop in obj ? obj[prop] : 'Property not found';
    }
};

 
const proxyObject = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
print(proxyObject.a);
print(proxyObject.b);
print(proxyObject.d);

 
const numberGenInstance = numberGenerator();
printNumbers(numberGenInstance);
