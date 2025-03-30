 

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 1000);
    });
}

 
function* dataGenerator() {
    yield "First piece of data";
    yield "Second piece of data";
    yield "Third piece of data";
}

 
async function processData() {
    const iterator = dataGenerator();
    
    for (let data of iterator) {
        print(data);
    }
    
    const fetchedData = await fetchData();
    print(fetchedData);
}

 
const dataHandler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Set property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataObject = new Proxy({ name: "Test Object", value: 42 }, dataHandler);

 
print(dataObject.name);
dataObject.value = 100;

 
processData();
