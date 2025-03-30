const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processData = (data) => {
    return data.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item.name);
        return acc;
    }, {});
};

const renderData = (processedData) => {
    for (const [category, names] of Object.entries(processedData)) {
        print(`Category: ${category}`);
        names.forEach(name => print(` - ${name}`));
    }
};

(async () => {
    const rawData = await fetchData('https://jsonplaceholder.typicode.com/users');
    const processedData = processData(rawData);
    renderData(processedData);
})();

 
 
 
 
 
 
