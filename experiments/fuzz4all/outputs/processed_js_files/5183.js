 

function* numberGenerator(limit) {
    let num = 0;
    while (num < limit) {
        yield num++;
    }
}

async function processNumbers(generator) {
    const numbers = [];
    for (let number of generator) {
        const squared = await squareAsync(number);
        numbers.push(squared);
    }
    return numbers;
}

function squareAsync(number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(number * number);
        }, 100);
    });
}

const handler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
    }
};

const proxy = new Proxy({}, handler);

 
(async function main() {
    const numberLimit = 5;
    const numGen = numberGenerator(numberLimit);

    const squaredNumbers = await processNumbers(numGen);
    
    squaredNumbers.forEach((num, index) => {
        proxy[`square_${index}`] = num;
    });

    print('Processed numbers with their squares:', proxy);
    print('Trying to access a non-existent property:', proxy.nonExistent);
})();
