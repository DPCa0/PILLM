 

async function complexFunction(...numbers) {
    try {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = numbers.reduce((acc, num) => acc + num, 0);
                result ? resolve(result) : reject('No numbers provided');
            }, 1000);
        });

        const result = await promise;
        const { doubleResult, squaredResult } = await processResult(result);

        print(`Sum: ${result}, Double: ${doubleResult}, Squared: ${squaredResult}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function processResult(result) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const doubleResult = result * 2;
            const squaredResult = result ** 2;
            resolve({ doubleResult, squaredResult });
        }, 1000);
    });
}

complexFunction(1, 2, 3, 4, 5);
