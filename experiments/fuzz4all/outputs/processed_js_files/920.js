const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
};

const processData = (data) => {
    return data.map(({ id, value }) => ({ 
        id, 
        transformedValue: value * 2 + Math.random() 
    }));
};

const runAsyncOperations = async () => {
    try {
        const url = 'https://api.example.com/data';
        const rawData = await fetchData(url);
        const processedData = processData(rawData);

        const filteredData = processedData
            .filter(item => item.transformedValue > 10)
            .reduce((acc, item) => {
                if (!acc.has(item.id)) acc.set(item.id, []);
                acc.get(item.id).push(item.transformedValue);
                return acc;
            }, new Map());

        filteredData.forEach((values, key) => {
            print(`ID: ${key}, Average: ${values.reduce((a, b) => a + b) / values.length}`);
        });

    } catch (error) {
        console.error('Error during asynchronous operations:', error);
    }
};

const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

const onResize = debounce(() => {
    print('Window resized', new Date().toLocaleTimeString());
}, 300);

window.addEventListener('resize', onResize);
runAsyncOperations();
