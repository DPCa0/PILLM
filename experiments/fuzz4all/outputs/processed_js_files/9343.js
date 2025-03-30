 

const fetchData = async (url) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { success: true, data: { url, content: "Sample Data" } };
            if (data.success) resolve(data.data);
            else reject("Error fetching data.");
        }, 1000);
    });
};

const dataHandler = {
    get: (target, property) => {
         
        return Reflect.get(target, property) || `Property '${property}' does not exist.`;
    },
    set: (target, property, value) => {
         
        if (property === 'content' && typeof value !== 'string') {
            console.error("Content must be a string.");
            return false;
        }
        return Reflect.set(target, property, value);
    }
};

const main = async () => {
    try {
        let data = await fetchData("https://example.com/api");
        const proxyData = new Proxy(data, dataHandler);

         
        print("Fetched URL:", proxyData.url);
        print("Fetched Content:", proxyData.content);

         
        print("Non-existent Property:", proxyData.nonExistentProperty);

         
        proxyData.content = "Updated Content";
        print("Updated Content:", proxyData.content);

         
        proxyData.content = 123;  

    } catch (error) {
        console.error("Error in main:", error);
    }
};

main();
