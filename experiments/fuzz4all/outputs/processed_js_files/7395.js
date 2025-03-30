 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* fetchData() {
    const dataPoints = ['Data Point 1', 'Data Point 2', 'Data Point 3'];
    for (const data of dataPoints) {
        await delay(1000);  
        yield data;
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property "${prop}": ${obj[prop]}`);
            return obj[prop];
        } else {
            print(`Property "${prop}" not found.`);
            return undefined;
        }
    }
};

 
const targetObject = {
    name: 'Advanced JS Example',
    type: 'Demo'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
(async function () {
    print(proxyObject.name);
    print(proxyObject.unknownProp);

    for await (const data of fetchData()) {
        print(`Fetched: ${data}`);
    }
})();
