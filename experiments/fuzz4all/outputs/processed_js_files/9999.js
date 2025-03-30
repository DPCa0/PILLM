 

const dataHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist.`);
            return null;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

function* dataGenerator() {
    yield fetchData(1);
    yield fetchData(2);
    yield fetchData(3);
}

const proxyData = new Proxy({}, dataHandler);

async function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = { id, content: `Data for ID: ${id}` };
            print(`Fetched ${data.content}`);
            proxyData[id] = data;
            resolve(data);
        }, 1000 * id);  
    });
}

(async function processData() {
    const generator = dataGenerator();
    for await (let dataPromise of generator) {
        const data = await dataPromise;
        print(`Processed: ${data.content}`);
    }
})();
