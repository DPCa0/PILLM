 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

async function processData(urls) {
    try {
        const dataMap = new Map();
        const fetchPromises = urls.map(url => fetchData(url));

        const results = await Promise.all(fetchPromises);
        results.forEach((data, index) => {
            const { id, ...details } = data;
            dataMap.set(id, details);
        });

        print('Processed Data Map:', dataMap);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://jsonplaceholder.typicode.com/users/3',
];

processData(urls);
