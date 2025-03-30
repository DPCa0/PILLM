 

 
function* asyncGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('First Promise'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second Promise'), 2000));
    yield new Promise(resolve => setTimeout(() => resolve('Third Promise'), 3000));
}

 
async function asyncHandler(gen) {
    for await (let promise of gen) {
        print(await promise);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
    }
};

const targetObject = { message: "Hello, Proxy World!" };
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.message);

 
asyncHandler(asyncGenerator());
