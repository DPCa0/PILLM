 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

 
const infiniteIterable = {
    [Symbol.iterator]: infiniteSequence
};

 
(async function processSequence() {
    let count = 0;
    for (let number of infiniteIterable) {
        print(`Processing number: ${number}`);
        await delay(1000);  
        if (++count >= 5) break;
    }
    print('Done processing numbers.');
})();

 
const handler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
    }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

print(proxyObject.a);  
print(proxyObject.b);  
print(proxyObject.c);  

 
const _privateField = new WeakMap();

class Secret {
    constructor(secret) {
        _privateField.set(this, secret);
    }
    
    revealSecret() {
        print(`The secret is: ${_privateField.get(this)}`);
    }
}

const mySecret = new Secret('Top Secret');
mySecret.revealSecret();  
