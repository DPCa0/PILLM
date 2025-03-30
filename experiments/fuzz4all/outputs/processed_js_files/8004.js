 

 
function* numberGenerator() {
    let number = 0;
    while (true) {
        yield number++;
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Fetched Data');
        }, 1000);
    });
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property '${prop}' with value: ${target[prop]}`);
            return target[prop];
        } else {
            throw new Error(`Property '${prop}' does not exist.`);
        }
    },
    set(target, prop, value) {
        if (typeof value === 'string') {
            print(`Setting property '${prop}' to value: ${value}`);
            target[prop] = value;
            return true;
        } else {
            throw new Error(`Value for '${prop}' must be a string.`);
        }
    }
};

const obj = new Proxy({}, handler);

 
async function main() {
    obj.name = "Complex JS Program";
    const { name } = obj;
    print(`Program Name: ${name}`);

     
    const data = await fetchData();
    print(`Async Operation Result: ${data}`);

     
    const gen = numberGenerator();
    for (let i = 0; i < 5; i++) {
        print(`Generated Number: ${gen.next().value}`);
    }
}

 
main();
