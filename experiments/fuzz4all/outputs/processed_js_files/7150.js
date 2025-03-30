 
async function complexAsyncOperation() {
     
    const delay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 2000) + 1000));

     
    const fetchData = async (id) => {
        await delay();
        return { id, data: `Data for item ${id}` };
    };

     
    const fetchMultipleData = async (ids) => {
        const promises = ids.map(id => fetchData(id));
        return await Promise.all(promises);
    };

     
    try {
        const results = await fetchMultipleData([1, 2, 3, 4, 5]);
        print('Fetched Data:', results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const advancedDataStructureUsage = () => {
     
    const uniqueNumbers = new Set([1, 2, 3, 4, 5, 5, 6, 6]);
    print('Unique Numbers:', [...uniqueNumbers]);

     
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    print('Map Entries:', map.entries());

     
    for (const [key, value] of map) {
        print(`${key}: ${value}`);
    }
};

 
(async () => {
    print('Starting complex operations...');
    
     
    await complexAsyncOperation();
    
     
    advancedDataStructureUsage();
    
    print('Complex operations completed.');
})();
