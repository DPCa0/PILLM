 

 
const asyncOperation = (operationName) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 3000) + 500;
        setTimeout(() => {
            if (Math.random() < 0.8) {  
                resolve(`${operationName} completed in ${delay} ms`);
            } else {
                reject(new Error(`${operationName} failed`));
            }
        }, delay);
    });
};

 
const executeAsyncOperations = async () => {
    try {
        print('Starting operations...');

        const results = await Promise.all([
            asyncOperation('Operation 1'),
            asyncOperation('Operation 2'),
            asyncOperation('Operation 3')
        ]);

        results.forEach((result, index) => {
            print(`Result ${index + 1}: ${result}`);
        });

        print('All operations completed successfully.');

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

 
function* fibonacciGenerator(max) {
    let [prev, curr] = [0, 1];
    while (curr <= max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const printFibonacciNumbers = (max) => {
    const sequence = [...fibonacciGenerator(max)];
    print(`Fibonacci sequence up to ${max}:`, sequence.join(', '));
};

 
executeAsyncOperations();
printFibonacciNumbers(100);
