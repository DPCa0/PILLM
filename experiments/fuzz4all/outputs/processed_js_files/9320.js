 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* numberGenerator(max, delayTime) {
    for (let i = 1; i <= max; i++) {
        await delay(delayTime);
        yield i;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting property '${prop}'`);
        return prop in target ? target[prop] : undefined;
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
const data = new Proxy({ result: [] }, handler);

 
async function processNumbers(max) {
    try {
        const numbers = numberGenerator(max, 500);
        for await (const num of numbers) {
            print(`Processing number: ${num}`);
            data.result.push(num);
        }
        print('Final Result:', data.result);
    } catch (error) {
        console.error('Error processing numbers:', error);
    }
}

 
processNumbers(5);
