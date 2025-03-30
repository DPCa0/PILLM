 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = async (data) => {
    const delayedProcess = (data) => new Promise(resolve => setTimeout(() => resolve(data.map(item => item * 2)), 1000));
    return delayedProcess(data);
};

const loggingHandler = {
    get: (target, property) => {
        print(`Property '${property}' accessed`);
        return target[property];
    }
};

(async () => {
    try {
        const url = 'https://api.jsonbin.io/b/5f69afbe65b18913fc510ce8';
        const rawData = await fetchData(url);
        
        const { data: [firstItem, ...restItems] } = rawData;
        print('First item:', firstItem);

        const dataProxy = new Proxy({ data: restItems }, loggingHandler);
        const processedData = await processData(dataProxy.data);

        print('Processed Data:', processedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
