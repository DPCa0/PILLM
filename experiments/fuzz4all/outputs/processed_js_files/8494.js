 

 
function* dataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve(1), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(2), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(3), 1000));
}

 
async function processData(generator) {
    let result;
    while (!(result = generator.next()).done) {
        const value = await result.value;
        print(`Processed value: ${value}`);
    }
}

 
async function fetchData() {
    print("Fetching Data...");
    const dataGen = dataGenerator();
    await processData(dataGen);
    print("Data Fetch Complete");
}

 
fetchData().catch(console.error);
