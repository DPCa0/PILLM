 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return { data: "Important data", timestamp: new Date().toISOString() };
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    }
};

 
(async () => {
    try {
        print("Fetching data...");
        const result = await fetchData();
        const proxyResult = new Proxy(result, handler);

        print("Data fetched:", proxyResult.data);
        print("Timestamp:", proxyResult.timestamp);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
