 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield new Promise((resolve) =>
            setTimeout(() => resolve(num++), 1000)
        );
    }
}

 
async function processNumbers(generator) {
    const iterator = generator();

    for (let i = 0; i < 5; i++) {
        let promise = iterator.next().value;
        print(await promise);
    }
}

 
const target = {
    name: 'Default',
    age: 25
};

 
const handler = {
    get: function (obj, prop) {
        if (prop in obj) {
            return obj[prop];
        } else {
            console.warn(`Property "${prop}" is not found!`);
            return 'Not available';
        }
    },
    set: function (obj, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        obj[prop] = value;
        print(`Property "${prop}" set to ${value}`);
    }
};

 
const proxy = new Proxy(target, handler);

 
try {
    print(proxy.name);
    proxy.age = 30;
    proxy.gender = 'male';  
    proxy.age = 'thirty';   
} catch (e) {
    console.error(e);
}

 
processNumbers(numberGenerator);
