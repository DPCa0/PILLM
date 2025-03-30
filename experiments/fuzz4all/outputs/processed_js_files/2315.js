 

 
const fetchData = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, data: `Data for ID ${id}` });
        }, 1000);
    });
};

 
function* dataFetcher(ids) {
    for (const id of ids) {
        yield fetchData(id);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop === 'nextData') {
            const result = target.generator.next();
            return result.done ? null : result.value;
        }
        return target[prop];
    }
};

 
async function fetchAllData(ids) {
    const iterator = dataFetcher(ids);
    const proxy = new Proxy({ generator: iterator }, handler);

    let data;
    while ((data = await proxy.nextData) !== null) {
        print(data);
    }
}

 
const ids = [1, 2, 3, 4];
fetchAllData(ids).catch(console.error);
