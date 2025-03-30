 

 
function* numberGenerator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = {};
const proxyObject = new Proxy(targetObject, handler);

 
async function asyncOperation() {
    const asyncAction = () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve("Action Completed!"), 1000);
        });
    };
    
    const result = await asyncAction();
    print(result);
}

 
(async () => {
     
    const gen = numberGenerator();
    print(`Generated Number: ${gen.next().value}`);
    print(`Generated Number: ${gen.next().value}`);
    
     
    proxyObject.someProperty = 42;
    print(`someProperty: ${proxyObject.someProperty}`);
    
     
    await asyncOperation();
})();
