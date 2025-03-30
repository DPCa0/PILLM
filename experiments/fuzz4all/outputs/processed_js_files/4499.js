 

 
function* fetchData() {
    const dataChunks = [
        { id: 1, value: 'Chunk 1' },
        { id: 2, value: 'Chunk 2' },
        { id: 3, value: 'Chunk 3' }
    ];
    for (const chunk of dataChunks) {
        yield new Promise((resolve) => setTimeout(() => resolve(chunk), 1000));
    }
}

 
async function retrieveData() {
    const dataGenerator = fetchData();
    let results = [];

    for (let chunkPromise of dataGenerator) {
         
        const chunk = await chunkPromise;
        results = [...results, chunk];  
    }

    return results;
}

 
async function processData() {
    const data = await retrieveData();

    const [first, ...rest] = data;  

    print('First Chunk:', first);
    print('Rest of the Chunks:', rest);
}

 
processData();
