const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
    }
};

const processData = (data) => {
    return data.reduce((acc, item) => {
        const { category, value } = item;
        acc[category] = (acc[category] || 0) + value;
        return acc;
    }, {});
};

const outputData = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        print(`Category: ${key}, Total Value: ${value}`);
    });
};

(async () => {
    const data = await fetchData('https://api.example.com/data');
    if (data) {
        const processedData = processData(data);
        outputData(processedData);
    }
})();
