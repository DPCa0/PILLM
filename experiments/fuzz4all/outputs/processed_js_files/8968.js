 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    const simulatedNetworkLatency = Math.random() * 2000;
    await delay(simulatedNetworkLatency);
    return { user: 'Jane Doe', age: 28, occupation: 'Engineer' };
}

 
function* dataGenerator() {
    for (let i = 0; i < 3; i++) {
        print(`Fetching data set ${i + 1}...`);
        yield fetchData();
    }
}

 
async function processData() {
    const generator = dataGenerator();
    for (let promise of generator) {
        const data = await promise;
         
        const { user, age, occupation } = data;
        print(`Received: ${user}, ${age} years old, works as ${occupation}`);
    }
}

 
(async () => {
    print('Starting data processing:');
    await processData();
    print('All data processed.');
})();
