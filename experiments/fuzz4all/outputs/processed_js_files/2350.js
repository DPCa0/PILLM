 

 
function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.1 ? resolve(`Data for ID: ${id}`) : reject(`Failed to fetch data for ID: ${id}`);
        }, 1000);
    });
}

 
function* idGenerator(max) {
    for (let i = 1; i <= max; i++) {
        yield i;
    }
}

 
async function processData(generator) {
    const results = new Map();

    for (let id of generator) {
        try {
            const data = await fetchData(id);
            results.set(id, data);
        } catch (error) {
            console.error(error);
        }
    }

    return results;
}

 
(async () => {
    const idGen = idGenerator(5);
    const results = await processData(idGen);

    print("Processed Data:");
    results.forEach((value, key) => {
        print(`ID ${key}: ${value}`);
    });
})();
