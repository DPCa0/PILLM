 

 
function* numberGenerator(max) {
    let num = 1;
    while (num <= max) {
        yield new Promise(resolve => setTimeout(() => resolve(num++), 100));
    }
}

 
async function handleGenerator(gen) {
    for await (let number of gen) {
        print(`Generated number: ${number}`);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property "${prop}"`);
        return target[prop];
    }
};

const array = new Proxy([10, 20, 30], handler);

 
async function main() {
    print('Starting generator...');
    await handleGenerator(numberGenerator(5));

    print('Accessing array elements...');
    print(`Element 0: ${array[0]}`);
    print(`Element 1: ${array[1]}`);
    print(`Element 2: ${array[2]}`);
}

main().catch(console.error);
