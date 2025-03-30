 

 
function* numberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        yield i;
    }
}

 
async function processNumbers(generator) {
    const numbers = [];
    for (const number of generator) {
         
        const processedNumber = await new Promise((resolve) => {
            setTimeout(() => resolve(number * 2), 100);
        });
        numbers.push(processedNumber);
    }
    return numbers;
}

 
const handler = {
    get: (target, prop) => {
        if (prop === 'doubleSum') {
            return target.reduce((sum, num) => sum + num, 0) * 2;
        }
        return Reflect.get(target, prop);
    }
};

 
(async function main() {
    const limit = 5;
    const generator = numberGenerator(limit);
    const processedNumbers = await processNumbers(generator);

     
    const proxyNumbers = new Proxy(processedNumbers, handler);

    print('Processed Numbers:', proxyNumbers);
    print('Double Sum of Processed Numbers:', proxyNumbers.doubleSum);
})();
