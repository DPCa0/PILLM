 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

async function processData(url) {
    try {
        const data = await fetchData(url);
        const { results } = data;
        
        const enhancedData = results.map(({ id, name, value }) => ({
            id,
            name: name.toUpperCase(),
            value: value * 2
        }));

        const sequenceGenerator = generateSequence(1, enhancedData.length);
        for (let number of sequenceGenerator) {
            print(`Processing item ${number}`);
        }

        const uniqueValues = new Set(enhancedData.map(item => item.value));
        const filteredData = enhancedData.filter(item => uniqueValues.has(item.value));
        
        print(filteredData);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
const apiEndpoint = 'https://api.example.com/data';
processData(apiEndpoint);
