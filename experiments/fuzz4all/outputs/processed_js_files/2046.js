 
const asyncOperation = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num % 2 === 0) {
                resolve(`Even number: ${num}`);
            } else {
                reject(`Odd number: ${num}`);
            }
        }, 1000);
    });
};

 
const loggerHandler = {
    get: (target, prop) => {
        print(`Accessing property ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const obj = new Proxy({ name: 'JavaScript', version: 'ES6+' }, loggerHandler);

 
print(obj.name);
obj.version = 'ESNext';

 
function* numberGenerator(max) {
    for (let i = 0; i <= max; i++) {
        yield i;
    }
}

 
(async () => {
    const generator = numberGenerator(5);
    for (let num of generator) {
        try {
            const result = await asyncOperation(num);
            print(result);
        } catch (error) {
            console.error(error);
        }
    }
})();
