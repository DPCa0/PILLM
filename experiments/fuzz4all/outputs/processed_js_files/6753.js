 
async function fetchData() {
     
    const fetchFromServer = (id) => new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, data: `data for ${id}` });
        }, Math.random() * 2000);
    });

     
    const promises = [1, 2, 3, 4, 5].map(id => fetchFromServer(id));

     
    const results = await Promise.all(promises);

     
    const processedData = results
        .map(({ id, data }) => ({ id, data: data.toUpperCase() }))  
        .reduce((acc, { id, data }) => ({ ...acc, [id]: data }), {});  

    print('Processed Data:', processedData);
}

 
async function* numberGenerator() {
    let num = 1;
    while (num <= 5) {
        yield num++;
    }
}

 
(async function main() {
     
    await fetchData();

    print('Streaming Data:');
     
    for await (const num of numberGenerator()) {
        print(`Received number: ${num}`);
    }
})();
