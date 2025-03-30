const axios = require('axios');

(async () => {
    try {
        const fetchData = async (url) => {
            const { data } = await axios.get(url);
            return data;
        };

        const processData = (data) => {
            return data
                .map(item => ({
                    ...item,
                    processedValue: item.value * Math.random()
                }))
                .filter(item => item.processedValue > 0.5);
        };

        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const processed = processData(data);

        processed.forEach((item, index) => {
            print(`Item #${index + 1}:`, JSON.stringify(item, null, 2));
        });

        const sortByProcessedValue = processed.sort((a, b) => b.processedValue - a.processedValue);
        print('\nTop Processed Item:', sortByProcessedValue[0]);

        const topValuesSet = new Set(sortByProcessedValue.map(item => item.processedValue));
        print('\nUnique Processed Values:', [...topValuesSet]);

        print('\nAggregated Processed Value:', sortByProcessedValue.reduce((sum, item) => sum + item.processedValue, 0).toFixed(2));

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
