 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000)));

 
function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield i;
    }
}

 
async function processNumbers(limit) {
    const numbers = numberGenerator(limit);

     
    const results = await Promise.all([...numbers].map(async number => {
        await randomDelay();
        const squared = number ** 2;
        print(`Number: ${number}, Squared: ${squared}`);
        return squared;
    }));

     
    const total = results.reduce((acc, cur) => acc + (cur ?? 0), 0);
    print(`Total of squared numbers: ${total}`);
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop);
    }
};

 
const data = new Proxy({a: 1, b: 2, c: 3}, handler);

 
print(data.a);
print(data.b);

 
processNumbers(5);
