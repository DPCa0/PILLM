 

 
const delayedNumber = (num, delay) => new Promise(resolve => setTimeout(() => resolve(num), delay));

 
async function* generateSequence() {
    const nums = [await delayedNumber(1, 1000), await delayedNumber(2, 1000), await delayedNumber(3, 1000)];
    for (const num of nums) {
        yield num;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        } else {
            print(`Property '${prop}' not found`);
            return undefined;
        }
    }
};

 
const user = { name: 'Alice', age: 30, occupation: 'Engineer' };
const { name, ...details } = new Proxy(user, handler);
print(`Name: ${name}`);

 
async function consumeAsyncIterator() {
    const sequence = generateSequence();
    for await (const num of sequence) {
        print(`Received number: ${num}`);
    }
}

consumeAsyncIterator();
