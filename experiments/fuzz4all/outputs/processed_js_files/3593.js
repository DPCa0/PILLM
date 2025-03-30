 

const fetchData = async (url) => {
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    return `Data from ${url}`;
};

const processUrls = async (...urls) => {
    try {
        const fetchPromises = urls.map(url => fetchData(url));
        const results = await Promise.all(fetchPromises);

        const [firstResult, ...otherResults] = results;
        
        print(`First result: ${firstResult}`);
        print(`Other results:`, otherResults);

        const combinedData = results.reduce((acc, data) => `${acc}\n${data}`, 'Combined Data:');
        print(combinedData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
    'https://api.example.com/data4'
];

processUrls(...urls);
