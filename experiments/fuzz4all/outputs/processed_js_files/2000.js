class AsyncIterable {
    constructor(limit) {
        this.limit = limit;
    }
    
    async *[Symbol.asyncIterator]() {
        let i = 0;
        while (i < this.limit) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            yield i++;
        }
    }
}

async function processData() {
    const asyncIterable = new AsyncIterable(5);

    try {
        const results = [];
        
        for await (const number of asyncIterable) {
            const result = await new Promise((resolve, reject) => {
                if (number === 3) reject('Intentional error at number 3');
                resolve(`Processed ${number}`);
            });
            results.push(result);
        }

        return results;
    } catch (error) {
        console.error('Error:', error);
        return `Failed to process: ${error}`;
    } finally {
        print('Completed processing');
    }
}

processData().then(results => print('Results:', results));
