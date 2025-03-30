 

 
async function* numberGenerator() {
    let number = 1;
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield number++;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property '${prop}' with value: ${target[prop]}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.error(`Property '${prop}' does not exist.`);
        }
    },
    set(target, prop, value, receiver) {
        if (typeof value === 'number') {
            print(`Setting property '${prop}' to value: ${value}`);
            return Reflect.set(target, prop, value, receiver);
        } else {
            console.error(`Invalid value for '${prop}', must be a number.`);
            return false;
        }
    }
};

 
const numericObject = {
    a: 1,
    b: 2
};

 
const proxy = new Proxy(numericObject, handler);

 
(async () => {
    const gen = numberGenerator();
    
    for (let i = 0; i < 5; i++) {
        const { value } = await gen.next();
        proxy['a'] = value;
        print(proxy['a']);
        proxy['c'] = 'not a number';   
    }
})();
