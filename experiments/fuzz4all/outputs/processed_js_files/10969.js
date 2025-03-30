 

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    }
};

const proxiedGenerator = new Proxy(numberGenerator(), handler);

 
const asyncOperation = (value) => new Promise(resolve => {
    setTimeout(() => {
        print(`Async operation resolved with value: ${value}`);
        resolve(value);
    }, 1000);
});

 
async function processNumbers() {
    for (let i = 0; i < 5; i++) {
        const { value } = proxiedGenerator.next();
        print(`Generated number: ${value}`);
        await asyncOperation(value);
    }
}

processNumbers();
