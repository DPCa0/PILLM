 

 
async function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data for ID: ${id}`);
        }, 1000);
    });
}

 
function* generateDataRequests(ids) {
    for (const id of ids) {
        yield fetchData(id);
    }
}

 
async function processGenerator(generator) {
    const results = [];
    for (const promise of generator) {
        results.push(await promise);
    }
    return results;
}

 
async function* asyncResultIterator(results) {
    for (const result of results) {
        yield result.toUpperCase();
    }
}

 
async function main() {
    const ids = [1, 2, 3, 4, 5];
    const generator = generateDataRequests(ids);
    
    const results = await processGenerator(generator);
    print("Fetched Results:", results);
    
    const processedResults = [];
    for await (const processedResult of asyncResultIterator(results)) {
        processedResults.push(processedResult);
    }
    
    print("Processed Results:", processedResults);
}

 
main().catch(console.error);
