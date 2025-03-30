 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5], meta: { fetchedAt: new Date() } }), 1000);
});

 
const createLoggingProxy = (target) => new Proxy(target, {
    get: (obj, prop) => {
        print(`Accessed property "${prop}"`);
        return obj[prop];
    }
});

async function main() {
    try {
        print("Fetching data...");
        const response = await fetchData();
        
        const { data, meta } = createLoggingProxy(response);
        
        print(`Data fetched at: ${meta.fetchedAt}`);
        print(`Data: ${data.map(num => num * num).join(", ")}`);
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
