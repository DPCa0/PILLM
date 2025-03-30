 

const complexAsyncOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
    });
};

function* numberGenerator(numbers) {
    for (const number of numbers) {
        yield number * 2;
    }
}

const asyncFunction = async () => {
    try {
         
        const numbers = await complexAsyncOperation();
        
         
        const [first, ...rest] = numbers;
        print(`First number: ${first}`);

         
        const generator = numberGenerator(rest);
        let result = generator.next();
        
        while (!result.done) {
            print(`Processed number: ${result.value}`);
            result = generator.next();
        }

         
        const uniqueNumbers = new Set(numbers);
        const mappedNumbers = new Map([...uniqueNumbers].map(num => [num, num ** 2]));
        
        mappedNumbers.forEach((value, key) => {
            print(`Number: ${key}, Squared: ${value}`);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

(async () => {
    await asyncFunction();
})();
