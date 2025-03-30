 

 
function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `Name_${id}`, value: Math.random() * 100 });
        }, 1000);
    });
}

 
async function processItems(ids) {
    const dataMap = new Map();
    const results = await Promise.all(ids.map(id => fetchData(id)));

    results.forEach(({ id, name, value }) => {
        if (!dataMap.has(name)) {
            dataMap.set(name, new Set());
        }
        dataMap.get(name).add(value);
    });

    return dataMap;
}

 
(async () => {
    const itemIds = [1, 2, 3, 4, 5];
    const dataMap = await processItems(itemIds);

    for (const [name, values] of dataMap) {
        const avg = [...values].reduce((sum, val) => sum + val, 0) / values.size;
        print(`Average value for ${name}: ${avg.toFixed(2)}`);
    }
})();
