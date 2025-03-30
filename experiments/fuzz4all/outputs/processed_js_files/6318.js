 
const uniqueKey = Symbol('unique');

 
const handler = {
    get: (target, prop) => {
        if (prop === 'secret') {
            return `Secret is: ${target[uniqueKey]}`;
        }
        return prop in target ? target[prop] : 'Property not found!';
    },
    set: (target, prop, value) => {
        if (prop === 'password') {
            if (value.length >= 8) {
                target[prop] = value;
                print('Password set successfully');
                return true;
            }
            print('Password must be at least 8 characters long');
            return false;
        }
        target[prop] = value;
        return true;
    }
};

const secureObj = new Proxy({}, handler);
secureObj[uniqueKey] = 'SuperSecretValue123';
secureObj.password = 'short';  
secureObj.password = 'longEnoughPassword';  

 
function* generatorFunc() {
    yield 'First yield value';
    yield new Promise((resolve) => setTimeout(() => resolve('Async yield value'), 2000));
}

(async () => {
    const gen = generatorFunc();
    print(gen.next().value);  
    print(await gen.next().value);  

    print(secureObj.secret);  
    print(secureObj.nonExistentProperty);  
})();
