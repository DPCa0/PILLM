 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* numberGenerator(start = 0) {
    let index = start;
    while (true) {
        yield index++;
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Accessed property '${prop}' with value ${obj[prop]}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Set property '${prop}' to ${value}`);
        obj[prop] = value;
        return true;
    }
};

 
async function complexOperation(start = 0) {
    const obj = new Proxy({}, handler);
    const numbers = numberGenerator(start);

    for (let i = 0; i < 5; i++) {
        await delay(1000);  
        obj[`number${i}`] = numbers.next().value;
        print(`Current object state: ${JSON.stringify(obj)}`);
    }
}

 
complexOperation(10).then(() => {
    print('Operation completed');
});
