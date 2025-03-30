 

 
const fakeApiCall = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, data: `Data for ID: ${id}` });
            } else {
                reject(new Error("Invalid ID"));
            }
        }, 1000);
    });
};

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw new Error(`Property ${prop} doesn't exist`);
        }
    }
};

 
const apiProxy = new Proxy({}, handler);

 
function* dataFetcher(ids) {
    for (let id of ids) {
        yield fakeApiCall(id).catch(err => ({ error: err.message }));
    }
}

 
async function fetchData(ids) {
    const generator = dataFetcher(ids);
    for await (const response of generator) {
        if (response.error) {
            print(`Error fetching data: ${response.error}`);
        } else {
            print(`Fetched data: ${response.data}`);
        }
    }
}

 
const idsToFetch = [1, 2, -3, 4, 5];

 
apiProxy.loadData = fetchData;

 
apiProxy.loadData(idsToFetch).catch(err => console.error(err));
