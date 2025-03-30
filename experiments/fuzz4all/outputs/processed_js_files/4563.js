(async () => {
     
    async function* generateNumbers(limit) {
        for (let i = 0; i < limit; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(i), 100));
        }
    }

     
    const processNumbers = async (numbers) => {
        const results = await Promise.all(numbers.map(async num => {
            const processed = await (new Promise(resolve => setTimeout(() => resolve(num * num), 50)));
            return { original: num, squared: processed };
        }));
        return results;
    };

     
    const validator = {
        set(target, key, value) {
            if (key === 'limit' && (typeof value !== 'number' || value <= 0)) {
                throw new Error("Limit must be a positive number");
            }
            target[key] = value;
            return true;
        }
    };

    const config = new Proxy({ limit: 5 }, validator);

     
    const main = async ({ limit }) => {
        try {
            const numberGenerator = generateNumbers(limit);
            const numbers = [];
            for await (const num of numberGenerator) {
                numbers.push(num);
            }
            const results = await processNumbers(numbers);
            results.forEach(({ original, squared }) => {
                print(`Number: ${original}, Squared: ${squared}`);
            });
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

     
    await main(config);
})();
