 

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const data = new Proxy({ count: 0 }, handler);

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function incrementCount(max) {
    for (let i = 1; i <= max; i++) {
        await delay(500);   
        data.count = i;   
    }
    return data.count;
}

 
async function logFinalCount() {
    const result = await incrementCount(5);
    print(`Final count is: ${result}`);
}

 
logFinalCount();
