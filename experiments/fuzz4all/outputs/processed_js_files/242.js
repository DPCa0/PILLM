 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

 
const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : `Property '${prop}' not found`
};

const data = new Proxy({ name: "Advanced JS", version: "ES2023" }, handler);

async function fetchData() {
    await delay(1000);   
    const { name, version } = data;   
    return { name, version };
}

async function main() {
    const idGen = idGenerator();
    for (let i = 0; i < 3; i++) {
        const { name, version } = await fetchData();
        print(`ID: ${idGen.next().value}, Name: ${name}, Version: ${version}`);
    }
}

main();
