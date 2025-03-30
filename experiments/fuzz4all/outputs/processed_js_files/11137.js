 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const processData = (data) => {
    const processedData = new Map();
    const uniqueValues = new Set(data.map(item => item.value));
    const symbolKey = Symbol('metadata');

    uniqueValues.forEach((value, index) => {
        processedData.set(value, { index, [symbolKey]: `Meta-${value}` });
    });

    return processedData;
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const data = await fetchData(url);
    if (!data) return;

    const processedData = processData(data);
    const idGen = idGenerator();

    processedData.forEach((value, key) => {
        print(`ID: ${idGen.next().value}, Key: ${key}, Value:`, value);
    });
})();
