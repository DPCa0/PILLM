 

 
const fetchData = (id) => new Promise(resolve => {
    setTimeout(() => resolve(`Data for ID: ${id}`), 1000);
});

 
function* idGenerator(start) {
    let id = start;
    while(true) {
        yield id++;
    }
}

 
async function processIds(startId, count) {
    const generator = idGenerator(startId);

     
    const promises = Array.from({ length: count }, () => fetchData(generator.next().value));

     
    const results = await Promise.all(promises);

    return results;
}

 
const handler = {
    get(target, property) {
        if (property === 'getIdData') {
            return async function(startId, count) {
                try {
                    const data = await target[property](startId, count);
                    print('Processed Data:', data);
                } catch (error) {
                    console.error('Error processing data:', error);
                }
            }
        }
        return target[property];
    }
};

const api = {
    getIdData: processIds
};

const proxiedApi = new Proxy(api, handler);

 
proxiedApi.getIdData(1, 5);
