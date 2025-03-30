 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

const processItems = (items) => {
    return items.reduce((acc, item) => {
        const { category, value } = item;
        acc[category] = acc[category] || [];
        acc[category].push(value);
        return acc;
    }, {});
};

const computeAverages = (data) => {
    return Object.fromEntries(Object.entries(data).map(([key, values]) => {
        const total = values.reduce((sum, val) => sum + val, 0);
        return [key, (total / values.length).toFixed(2)];
    }));
};

const main = async () => {
    try {
        const data = await fetchData('https://api.example.com/data');
        const processedData = processItems(data);
        const averages = computeAverages(processedData);
        
        Object.entries(averages).forEach(([category, avg]) => {
            print(`Category: ${category}, Average: ${avg}`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

main();
