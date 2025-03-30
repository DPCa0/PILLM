 
async function complexFeatureDemo() {
    const fetchData = () => new Promise((resolve) => setTimeout(() => resolve({ data: [10, 20, 30, 40], user: { id: 1, name: 'Alice' } }), 1000));

    const processItem = async (item) => {
         
        return new Promise((resolve) => setTimeout(() => resolve(item * 2), 500));
    };

    try {
        const { data: rawData, user: { name } } = await fetchData();
        print(`Fetched data for user: ${name}`);

        const processedData = await Promise.all(rawData.map(async (item) => await processItem(item)));
        print('Processed Data:', ...processedData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

complexFeatureDemo();
