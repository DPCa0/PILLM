 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
        delay(500);   
    }
}

 
async function logNumbers(gen) {
    for (let i = 0; i < 5; i++) {
        const { value } = gen.next();
        print(`Number: ${value}`);
        await delay(500);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const obj = new Proxy({ a: 1, b: 2 }, handler);

 
print(obj.a);   
obj.b = 10;   
print(obj.b);   

 
const gen = numberGenerator();
logNumbers(gen);
