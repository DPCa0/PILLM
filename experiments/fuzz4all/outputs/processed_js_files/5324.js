 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* dataGenerator() {
    yield await fetchData(1);
    yield await fetchData(2);
    yield await fetchData(3);
}

 
async function fetchData(id) {
    await delay(1000);  
    return { id, data: `Data for ID: ${id}` };
}

 
(async function main() {
    print('Starting data fetch process...');
    
     
    const dataMap = new Map([
        [0, { id: 0, data: 'Initial data' }]
    ]);

    for await (const data of dataGenerator()) {
        print(`Fetched: ${data.data}`);
        dataMap.set(data.id, data);
    }

     
    const newData = [...dataMap].map(([key, { id, data }]) => ({ key, id, data }));

    print('All Data:', newData);
    print('Data fetch process completed.');
})();
