 

 
function asyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('Success') : reject('Failure');
        }, 1000);
    });
}

 
function* resultGenerator() {
    yield "Pending...";
    try {
        const result = await asyncOperation();
        yield `Result: ${result}`;
    } catch (error) {
        yield `Error: ${error}`;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            return `Property ${prop} does not exist`;
        }
    }
};

 
const data = new Proxy({ hello: "world" }, handler);

 
async function processAsyncOperation() {
    print(`Message from Proxy: ${data.hello}`);  
    print(`Nonexistent Property: ${data.goodbye}`);
    
    const generator = resultGenerator();
    
    print(generator.next().value);  
    print((await generator.next()).value);  
}

processAsyncOperation();
