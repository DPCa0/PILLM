 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5] });
        }, 1000);
    });
}

 
function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

 
const arrayHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing element at index: ${property}`);
            return Reflect.get(target, property);
        }
        console.warn(`Trying to access non-existing index: ${property}`);
        return undefined;
    }
};

(async () => {
    try {
         
        const response = await fetchData();
        print('Data fetched:', response.data);

         
        const proxiedData = new Proxy(response.data, arrayHandler);

         
        const generator = dataGenerator(proxiedData);
        for (const value of generator) {
            print('Processing value:', value);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
