 

const fetchData = async (url) => {
     
    return new Promise((resolve) => setTimeout(() => resolve({ data: { value: Math.random() * 100 } }), 1000));
};

function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

async function processAllData(urls) {
    const gen = dataGenerator(urls);
    const results = [];

    for (const promise of gen) {
        const { data: { value } } = await promise;   
        results.push(value.toFixed(2));
    }

    return results;
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
processAllData(urls).then(results => print(`Processed Data: [${results.join(', ')}]`));
