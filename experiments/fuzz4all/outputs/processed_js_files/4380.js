 
(async () => {
    const simulateAsyncOperation = (id, delay) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                print(`Operation ${id} completed after ${delay}ms`);
                resolve({ id, delay });
            }, delay);
        });
    };

    const operations = [
        simulateAsyncOperation(1, 1000),
        simulateAsyncOperation(2, 500),
        simulateAsyncOperation(3, 1500),
        simulateAsyncOperation(4, 700),
    ];

    try {
        const results = await Promise.all(operations);

         
        const [first, second, ...rest] = results;

        print(`Fastest operation: ${second.id} with ${second.delay}ms`);
        print(`First operation: ${first.id} with ${first.delay}ms`);

        print('Other operations:');
        rest.forEach(({ id, delay }) => {
            print(`Operation ${id} took ${delay}ms`);
        });

         
        const idMap = new Map(results.map(({ id, delay }) => [id, delay]));
        print('ID to delay map:', idMap);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
