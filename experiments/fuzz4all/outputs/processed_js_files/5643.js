 

 
async function fetchData() {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Fetched Data' });
        }, 2000);
    });
}

 
const dataHandler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Set property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
async function main() {
     
    const rawData = await fetchData();

     
    const proxyData = new Proxy(rawData, dataHandler);

     
    print(proxyData.data);  
    proxyData.newData = 'New Fetched Data';  
    print(proxyData.newData);  
}

 
main().catch(console.error);
