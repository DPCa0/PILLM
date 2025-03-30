 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
    });
};

 
function* dataGenerator(data) {
    for (const item of data) {
        yield item;
    }
}

 
const dataHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property: ${property}`);
            return Reflect.get(target, property);
        } else {
            print(`Property ${property} does not exist`);
            return undefined;
        }
    }
};

 
(async function main() {
    const data = await fetchData();
    
    const dataProxy = new Proxy(data, dataHandler);
    const iterator = dataGenerator(dataProxy);

    print("Fetched data:");
    for (let item of iterator) {
        print(item);
    }

     
    print(`First element: ${dataProxy[0]}`);
    print(`Invalid property: ${dataProxy[10]}`);
})();
