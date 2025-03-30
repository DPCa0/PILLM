 

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

 
async function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data for ID: ${id}`);
        }, Math.random() * 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return target[prop];
    }
};

const proxyObj = new Proxy({ url: "http://example.com", method: "GET" }, handler);

 
async function processGeneratorData() {
    const gen = numberGenerator();

    for (let i = 0; i < 5; i++) {
        const { value } = gen.next();
        print(`Processing value: ${value}`);

         
        const data = await fetchData(value);
        print(data);

         
        print(`Fetching from ${proxyObj.url} with method ${proxyObj.method}`);
    }
}

 
processGeneratorData().then(() => {
    print('Processing complete');
});
