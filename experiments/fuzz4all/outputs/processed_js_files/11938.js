 

 
const asyncIterable = {
    [Symbol.asyncIterator]: function* () {
        let i = 0;
        while (i < 5) {
            yield new Promise((resolve) =>
                setTimeout(() => resolve(i++), 1000)
            );
        }
    }
};

 
const logHandler = {
    get: function(target, property) {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    }
};

const targetObject = { message: "Hello, Proxy!" };
const proxy = new Proxy(targetObject, logHandler);

 
function* valueModifier() {
    let value = yield;
    while (true) {
        if (typeof value === 'number') {
            yield value * 2;
        } else {
            yield value;
        }
        value = yield;
    }
}

 
async function processData() {
    const modifier = valueModifier();
    modifier.next();  
    
    for await (const num of asyncIterable) {
        print(`Original Value: ${num}`);
        print(`Processed Value: ${modifier.next(num).value}`);
    }
    print(proxy.message);  
}

processData();
