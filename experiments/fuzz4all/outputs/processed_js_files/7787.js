const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Could not fetch data: ${error}`);
    }
};

const processData = (data) => {
    const groupedData = data.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {});
    
    return Object.fromEntries(
        Object.entries(groupedData).map(([key, value]) => [
            key,
            value.sort((a, b) => a.value - b.value)
        ])
    );
};

(async () => {
    const dataUrl = 'https://api.example.com/data';
    const rawData = await fetchData(dataUrl);

    if (rawData) {
        const processedData = processData(rawData);

        for (const [category, items] of Object.entries(processedData)) {
            console.group(`Category: ${category}`);
            items.forEach(item => print(`Item: ${item.name}, Value: ${item.value}`));
            console.groupEnd();
        }
    }
})();
