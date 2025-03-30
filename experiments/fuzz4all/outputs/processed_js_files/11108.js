const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = (data) => {
    return data.map(item => ({
        ...item,
        processed: true,
        timestamp: new Date().toISOString()
    }));
};

const mergeData = (...dataSets) => {
    return dataSets.reduce((acc, data) => [...acc, ...data], []);
};

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

const init = async () => {
    try {
        const [data1, data2] = await Promise.all([
            fetchData('https://api.example.com/data1'),
            fetchData('https://api.example.com/data2')
        ]);

        const processedData1 = processData(data1);
        const processedData2 = processData(data2);

        const mergedData = mergeData(processedData1, processedData2);

        print('Merged and Processed Data:', mergedData);
    } catch (error) {
        console.error('Error:', error);
    }
};

const debouncedInit = debounce(init, 300);

window.addEventListener('load', debouncedInit);
