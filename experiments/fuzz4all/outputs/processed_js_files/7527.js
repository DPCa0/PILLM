 

 
function* numberGenerator() {
    for (let i = 1; i <= 5; i++) {
        yield i;
    }
}

 
async function asyncSquare(num) {
    return new Promise(resolve => {
        setTimeout(() => resolve(num * num), 100);
    });
}

 
const handler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return property in target ? target[property] : 42;
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const myObj = new Proxy({ a: 1, b: 2 }, handler);

 
let { a, b } = myObj;

 
(async () => {
    const gen = numberGenerator();
    for (let value of gen) {
        let squared = await asyncSquare(value);
        print(`Squared ${value} is ${squared}`);
    }

     
    print(`Initial a: ${a}, b: ${b}`);
    myObj.a = 3;
    ({ a, b } = myObj);
    print(`Updated a: ${a}, b: ${b}`);
})();
