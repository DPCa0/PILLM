 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess() {
    try {
        print("Starting data fetch...");

         
        const data = await delay(1000).then(() => ({ value: 42 }));

        print("Data fetched:", data);

         
        const handler = {
            get: (target, prop) => {
                if (prop in target) {
                    print(`Accessing property: ${prop}`);
                    return target[prop];
                }
                return `Property ${prop} does not exist`;
            },
            set: (target, prop, value) => {
                print(`Setting property ${prop} to ${value}`);
                target[prop] = value;
                return true;
            }
        };

        const proxyData = new Proxy(data, handler);

         
        print(proxyData.value);    
        proxyData.value = 100;           
        print(proxyData.value);    

         
        const processedData = await delay(500).then(() => proxyData.value * 2);
        print("Processed Data:", processedData);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 
(async () => {
    await fetchDataAndProcess();
})();
