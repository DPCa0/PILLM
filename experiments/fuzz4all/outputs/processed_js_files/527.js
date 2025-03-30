const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

const processData = (data) => {
    const grouped = data.reduce((acc, item) => {
        const date = new Date(item.date).toISOString().split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(item.value);
        return acc;
    }, {});

    return Object.entries(grouped).map(([date, values]) => ({
        date,
        average: values.reduce((sum, value) => sum + value, 0) / values.length
    }));
};

(async () => {
    try {
        const url = 'https://api.example.com/data';
        const rawData = await fetchData(url);
        
        const transformedData = processData(rawData);
        
        const enhancedData = transformedData.map(({ date, average }) => ({
            date,
            average,
            status: average > 50 ? 'High' : 'Low'
        }));

        print(JSON.stringify(enhancedData, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
})();
