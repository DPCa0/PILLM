 

 
async function fetchData() {
    return new Promise(resolve => setTimeout(() => resolve({ id: 1, name: "John Doe" }), 1000));
}

 
function* processData(data) {
    const enrichedData = { ...data, timestamp: new Date().toISOString() };
    yield `Processing data for user: ${enrichedData.name}`;
    yield `User ID: ${enrichedData.id}`;
    yield `Timestamp: ${enrichedData.timestamp}`;
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        }
        print(`Property ${prop} not found`);
    }
};

 
(async () => {
    try {
        const rawData = await fetchData();
        const data = { ...rawData };
        const generator = processData(data);
        const proxyGenerator = new Proxy(generator, handler);

        for (let step of proxyGenerator) {
            print(step);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
