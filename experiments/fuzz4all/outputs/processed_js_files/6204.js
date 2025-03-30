 

 
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

 
async function asyncProcessor(gen) {
    for await (const num of gen) {
        print(`Processing number: ${num}`);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return target[prop];
        }
        return 42;  
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
proxy.a = 10;
print(proxy.a);   
print(proxy.b);   
print(proxy.c);   

 
(async () => {
    await asyncProcessor(numberGenerator());
})();
