 
async function fetchDataAndProcess(url) {
    try {
         
        const response = await fetch(url);
        const data = await response.json();

         
        const frequencyMap = new Map();
        
        data.forEach(item => {
            frequencyMap.set(item.type, (frequencyMap.get(item.type) || 0) + 1);
        });

         
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

         
        await delay(1000);

         
        const uniqueTypes = new Set(data.map(item => item.type));
        
         
        const [firstItem, ...restItems] = data;

        print("First Item:", firstItem);
        print("Unique Types:", [...uniqueTypes]);
        print("Frequency Map:", frequencyMap);
        
         
        const handler = {
            get: function(target, prop, receiver) {
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                } else {
                    console.warn(`Property '${prop}' does not exist on target object.`);
                    return null;
                }
            }
        };

        const proxyData = new Proxy(data[0], handler);
        print("Access existing property:", proxyData.type);
        print("Access non-existing property:", proxyData.nonExistingProperty);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 
fetchDataAndProcess('https://api.example.com/data');
