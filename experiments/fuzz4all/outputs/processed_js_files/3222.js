 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

const idGen = idGenerator();

const fetchData = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id % 2 === 0) {
                resolve({ id, data: `Data for ID: ${id}` });
            } else {
                reject(`Error: Invalid ID ${id}`);
            }
        }, 1000);
    });
};

const processIds = async (count) => {
    let results = [];
    for (let i = 0; i < count; i++) {
        const id = idGen.next().value;
        try {
            const result = await fetchData(id);
            results.push(result);
        } catch (error) {
            console.warn(error);
        }
    }
    return results;
};

(async () => {
    const count = 5;  
    const processedResults = await processIds(count);
    print('Processed Results:', processedResults);
})();
