 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchData(url) {
    print(`Fetching data from ${url}...`);
    await delay(1000);
    return { data: "Sample Data" };
}

 
const createDataProxy = (data) => {
    return new Proxy(data, {
        get(target, property) {
            print(`Accessing property: ${property}`);
            return target[property];
        },
        set(target, property, value) {
            print(`Setting property: ${property} to ${value}`);
            target[property] = value;
            return true;
        },
    });
};

 
(async () => {
    try {
         
        const response = await fetchData('https://api.example.com/data');

         
        const proxiedData = createDataProxy(response);

         
        print(proxiedData.data);
        proxiedData.data = "Updated Data";

         
        const { data, ...rest } = proxiedData;
        print(`Data: ${data}, Rest:`, rest);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
