 

 
const fetchData = (id) => new Promise((resolve) => {
    setTimeout(() => resolve({ id, data: `Data for ${id}` }), 1000);
});

 
function* requestGenerator(ids) {
    for (let id of ids) {
        yield fetchData(id);
    }
}

 
async function processRequests(ids) {
    const generator = requestGenerator(ids);

    for await (let promise of generator) {
        try {
            const { id, data } = await promise;
            print(`Processed ${id}: ${data}`);
        } catch (err) {
            console.error(`Error processing request for id ${id}: ${err}`);
        }
    }
}

 
const ids = [1, 2, 3, 4, 5];
processRequests(ids);
