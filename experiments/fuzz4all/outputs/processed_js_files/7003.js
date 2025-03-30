 

 
function fetchData(apiEndpoint) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${apiEndpoint}`);
        }, 1000);
    });
}

 
const dataHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessed property: ${property}`);
            return Reflect.get(target, property);
        } else {
            console.warn(`Property ${property} does not exist.`);
            return null;
        }
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

 
async function processData() {
    const apiProxy = new Proxy({ endpoint: 'https://api.example.com/data' }, dataHandler);

    try {
        const data = await fetchData(apiProxy.endpoint);
        print(`Fetched: ${data}`);

        apiProxy.newProperty = 'New Value';
        print(`New Property Value: ${apiProxy.newProperty}`);

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

processData();
