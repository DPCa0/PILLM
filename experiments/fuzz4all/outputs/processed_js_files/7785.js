 

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(id) {
    await delay(1000);
    return { id, data: `Data for id ${id}` };
}

const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property ${prop} does not exist`);
        }
    }
};

const dataCache = new Proxy({}, handler);

(async function main() {
    try {
        const id = ids.next().value;
        const data = await fetchData(id);
        dataCache[id] = data;
        print(dataCache[id]);
        print(dataCache[999]);  
    } catch (error) {
        console.error(error.message);
    }
})();
