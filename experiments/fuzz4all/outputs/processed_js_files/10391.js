 

 
async function fetchData(resource) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${resource}`);
        }, 1000);
    });
}

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessing property "${property}" with value "${target[property]}"`);
            return target[property];
        } else {
            return undefined;
        }
    }
};

 
const symKey = Symbol("uniqueKey");

 
async function main() {
    let data = await fetchData('https://example.com/api');
    
     
    const dataObject = {
        [symKey]: 'Symbolic data',
        data: data,
        timestamp: new Date().toISOString()
    };

     
    const proxiedDataObject = new Proxy(dataObject, handler);
    
     
    print(proxiedDataObject[symKey]);
    print(proxiedDataObject.data);
    print(proxiedDataObject.timestamp);

     
    print(proxiedDataObject.nonExistent);
}

 
main();
