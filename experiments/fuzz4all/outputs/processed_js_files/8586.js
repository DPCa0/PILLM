 

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

 
const databaseHandler = {
    get: (obj, prop) => {
        print(`GET operation on ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`SET operation on ${prop}`);
        obj[prop] = value;
        return true;
    }
};

const db = new Proxy({}, databaseHandler);

 
function apiCall(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.3;
            success ? resolve(`Data for ID ${id}`) : reject(`Error fetching data for ID ${id}`);
        }, 1000);
    });
}

 
async function fetchData() {
    const id = idGen.next().value;
    print(`Fetching data for ID: ${id}`);
    try {
        const data = await apiCall(id);
        db[id] = data;  
        print(`Fetched and stored: ${data}`);
    } catch (error) {
        console.error(error);
    }
}

 
(async function scheduleTasks() {
    await fetchData();
    await fetchData();
})();
