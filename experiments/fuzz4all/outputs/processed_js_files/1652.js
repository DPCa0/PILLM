const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < 3; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield i;
        }
    }
};

const fetchNumber = async () => {
    return new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 100)), 500));
};

const processNumbers = async (numbers) => {
    const results = [];
    for await (const num of numbers) {
        const fetchedNum = await fetchNumber();
        results.push({ original: num, fetched: fetchedNum });
    }
    return results;
};

(async () => {
    const results = await processNumbers(asyncIterable);
    const processedResults = results.map(({ original, fetched }) => {
        const total = original + fetched;
        return { original, fetched, total };
    });

    const finalResult = processedResults.reduce((acc, { total }) => acc + total, 0);
    
    print("Processed Results:", processedResults);
    print("Final Result Sum:", finalResult);
})();
