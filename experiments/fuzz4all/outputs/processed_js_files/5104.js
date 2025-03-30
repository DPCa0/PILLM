 

 
async function fetchData(id) {
    return new Promise(resolve => setTimeout(() => resolve({ id, data: `Data for ${id}` }), 1000));
}

 
function* generateIds() {
    let id = 1;
    while (id <= 3) {
        yield id++;
    }
}

 
const handler = {
    get(target, key) {
        print(`Accessing ${key}...`);
        return target.get(key);
    }
};

 
async function manageData() {
    const map = new Map();
    const ids = generateIds();
    const proxyMap = new Proxy(map, handler);

    for (const id of ids) {
         
        if (!proxyMap.has(id)) {
            print(`Fetching data for ID ${id}...`);
            const data = await fetchData(id);
            proxyMap.set(id, data);
        }
        print(proxyMap.get(id));
    }
}

 
manageData();
