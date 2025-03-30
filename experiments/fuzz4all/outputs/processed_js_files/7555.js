 

 
function simulateAsyncOperation(data, delay) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Processed: ${data}`), delay);
    });
}

 
function* dataProcessor(dataList) {
    for (const data of dataList) {
        yield simulateAsyncOperation(data, 1000);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return Reflect.get(target, prop);
        } else {
            print(`Property "${prop}" not found`);
            return null;
        }
    }
};

 
const dataObject = { name: "JavaScript", version: "ES2023" };
const proxyDataObject = new Proxy(dataObject, handler);

(async function main() {
    print(proxyDataObject.name);   
    print(proxyDataObject.author);  

    const dataList = ["Data1", "Data2", "Data3"];
    const processor = dataProcessor(dataList);

    for (const dataPromise of processor) {
        print(await dataPromise);   
    }
})();
