 
 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncNumbers() {
    for (let i = 1; i <= 5; i++) {
        yield delay(1000 * i).then(() => i);
    }
}

 
async function processNumbers() {
    const generator = asyncNumbers();
    for (let promise of generator) {
        print(`Awaiting number: ${await promise}`);
    }
}

 
const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : 'Property does not exist';
    }
};

 
const targetObject = { a: 1, b: 2 };

 
const proxyObject = new Proxy(targetObject, handler);

print(proxyObject.a);  
print(proxyObject.b);  
print(proxyObject.c);  

 
processNumbers().then(() => print("Processing complete"));
