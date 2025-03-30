 

 
async function* asyncNumberGenerator() {
    let num = 1;
    while (num <= 5) {
        yield Promise.resolve(num++);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Accessing number: ${property}`);
        return target[property];
    }
};

 
async function printNumbers() {
    const generator = asyncNumberGenerator();
    const proxy = new Proxy(generator, handler);

    for await (let num of proxy) {
        print(`Received number: ${num}`);
    }
}

 
async function main() {
    const numbers = [];
    const numberGenerator = asyncNumberGenerator();

    for await (let num of numberGenerator) {
        numbers.push(num * 2);  
    }

    const uniqueNumbers = [...new Set(numbers)];
    print(`Transformed and unique numbers: ${uniqueNumbers.join(', ')}`);
}

 
printNumbers().then(main);
