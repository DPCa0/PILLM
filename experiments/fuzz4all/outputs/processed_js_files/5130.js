 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print("Fetching data...");
    await delay(1000);  
    return { data: "Sample Data" };
}

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property '${property}': ${target[property]}`);
            return target[property];
        }
        print(`Property '${property}' not found`);
    }
};

 
(async () => {
    const data = await fetchData();
    
     
    const proxiedData = new Proxy(data, handler);

     
    print(proxiedData.data);

     
    const dataArray = ['a', 'b', 'c'];
    const generator = dataGenerator(dataArray);

    print("Iterating over data:");
    for (const value of generator) {
        print(value);
    }
})();
