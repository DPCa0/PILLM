const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = async (data) => {
    const { transform } = await import('lodash-es');
    return transform(data, (result, value, key) => {
        result[key.toUpperCase()] = value * 2;
    }, {});
};

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const data = await fetchData(url);
        
        const processedData = await processData(data);

        const promises = processedData.map(async item => {
            const userData = await fetchData(`https: 
            return { ...item, userName: userData.name };
        });

        const detailedData = await Promise.all(promises);
        
        print(detailedData);

    } catch (error) {
        console.error('Error:', error);
    }
})();
