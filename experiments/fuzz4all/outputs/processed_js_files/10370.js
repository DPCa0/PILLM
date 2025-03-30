 

async function fetchData() {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Advanced JavaScript", version: "ES2023" });
        }, 1000);
    });
}

 
async function* asyncGenerator() {
    const data = await fetchData();
    yield data.name;
    yield data.version;
}

 
const handler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : `Property '${prop}' not found`;
    }
};

 
async function main() {
    const asyncIter = asyncGenerator();

    const result = await asyncIter.next();
    print(`Fetched: ${result.value}`);

    const proxyData = new Proxy(await fetchData(), handler);
    print(`Version: ${proxyData.version}`);
    print(`Missing property: ${proxyData.nonExistent}`);
}

main();
