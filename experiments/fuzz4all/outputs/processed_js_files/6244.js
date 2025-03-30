 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncGenerator() {
    yield delay(1000).then(() => print('First yield resolved'));
    yield delay(2000).then(() => print('Second yield resolved'));
    return 'Done';
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} does not exist`);
            return null;
        }
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const targetObject = {a: 1, b: 2};
const proxy = new Proxy(targetObject, handler);

 
async function asyncRunner(genFunc) {
    const generator = genFunc();
    let result = generator.next();
    while (!result.done) {
        await result.value;
        result = generator.next();
    }
    print(result.value);  
}

 
print(proxy.a);  
proxy.c = 3;  
print(proxy.c);  

 
asyncRunner(asyncGenerator);
