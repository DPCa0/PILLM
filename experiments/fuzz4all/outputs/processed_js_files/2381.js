 

 
const fetchData = () => new Promise(resolve => {
    setTimeout(() => resolve(["apple", "banana", "cherry"]), 1000);
});

 
function* arrayIterator(arr) {
    for (const item of arr) {
        yield item;
    }
}

 
async function processData() {
    try {
        print("Fetching data...");
        const data = await fetchData();
        print("Data fetched:", data);

        const iterator = arrayIterator(data);
        let nextItem = iterator.next();
        
        while (!nextItem.done) {
            print("Processing item:", nextItem.value);
            nextItem = iterator.next();
        }
        
        print("All items processed.");

    } catch (error) {
        console.error("Error processing data:", error);
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property '${property}': ${target[property]}`);
            return target[property];
        } else {
            print(`Property '${property}' not found.`);
            return undefined;
        }
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const dataStore = new Proxy({}, handler);

 
dataStore.fruit = "banana";
print(dataStore.fruit);
print(dataStore.vegetable);

 
processData();
