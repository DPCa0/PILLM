 

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(generator) {
    const ids = [];
    let result;

     
    for (let i = 0; i < 5; i++) {
        result = generator.next();
        ids.push(result.value);
        print(`Fetching data for ID: ${result.value}`);
        await delay(1000);
    }

     
    return ids.map(id => ({ id, data: `Data for ID ${id}` }));
}

 
(async function() {
    const gen = idGenerator();
    
    try {
        const data = await fetchData(gen);
        
         
        const [firstData, ...rest] = data;
        print('First Data:', firstData);
        print('Rest of the Data:', rest);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
