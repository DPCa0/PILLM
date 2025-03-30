 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* generateAsyncSequence() {
    for (let i = 1; i <= 3; i++) {
        await delay(500);
        yield i;
    }
}

const handler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            console.warn(`Property '${property}' does not exist.`);
            return undefined;
        }
    }
};

async function run() {
    const obj = { a: 1, b: 2 };
    const proxyObj = new Proxy(obj, handler);

    print('Reading properties from a Proxy:');
    print(proxyObj.a);  
    print(proxyObj.b);  
    print(proxyObj.c);  

    print('Generating async sequence with delay:');
    const asyncGen = generateAsyncSequence();
    for await (let value of asyncGen) {
        print(value);  
    }
}

run();
