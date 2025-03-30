 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* createDelays() {
    yield delay(1000);
    yield delay(2000);
    yield delay(1500);
}

 
async function processDelays() {
    const delays = createDelays();
    for (let promise of delays) {
        await promise;
        print(`Processed delay at ${new Date().toLocaleTimeString()}`);
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Property '${property}' accessed at ${new Date().toLocaleTimeString()}`);
        return Reflect.get(target, property, receiver);
    }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
print(obj.a);
print(obj.b);

 
processDelays();
