(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const fetchJson = async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
    };

    const processData = async data => {
        try {
            const doubledValues = data.map(num => num * 2);
            const total = doubledValues.reduce((acc, num) => acc + num, 0);
            const average = total / doubledValues.length;
            return { doubledValues, average };
        } catch (error) {
            console.error('Processing Error:', error);
        }
    };

    const logData = data => {
        print(`Doubled Values: ${data.doubledValues}`);
        print(`Average Value: ${data.average}`);
    };

    const randomDataGenerator = function* () {
        while (true) {
            yield Math.floor(Math.random() * 100);
        }
    };

    const generateData = (generator, count) => {
        return Array.from({ length: count }, () => generator.next().value);
    };

    try {
        const randomGenerator = randomDataGenerator();
        const data = generateData(randomGenerator, 10);
        print('Original Data:', data);

        const processedData = await processData(data);
        if (processedData) logData(processedData);

         
        print('Waiting 2 seconds...');
        await delay(2000);

         
        const remoteData = await fetchJson('https://api.agify.io/?name=michael');
        print('Remote Data:', remoteData);
    } catch (error) {
        console.error('Unexpected Error:', error);
    }
})();
