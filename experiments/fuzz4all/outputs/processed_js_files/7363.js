 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
    for (let i = 0; i < 5; i++) {
        yield delay(1000).then(() => i);
    }
}

 
async function processNumbers() {
    const generator = numberGenerator();
    for await (const num of {
        [Symbol.asyncIterator]() { return this; },
        async next() {
            const result = generator.next();
            return result.done ? { done: true } : { done: false, value: await result.value };
        }
    }) {
        print(`Generated number: ${num}`);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property "${prop}" with value "${target[prop]}"`);
        return target[prop];
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
print(user.name);
print(user.age);

 
processNumbers();
