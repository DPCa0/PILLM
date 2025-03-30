 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: "Important Data", status: 200 });
        }, 1000);
    });
}

 
const dataHandler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed.`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting '${prop}' to '${value}'.`);
        target[prop] = value;
        return true;
    }
};

 
function* incrementor(start = 0) {
    let i = start;
    while (true) {
        yield i++;
    }
}

 
(async () => {
    const data = await fetchData();
    const proxyData = new Proxy(data, dataHandler);

    print(proxyData.data);  

    const inc = incrementor();

     
    const uniqueValues = new Set();
    for (let i = 0; i < 5; i++) {
        uniqueValues.add(inc.next().value);
    }

    print(Array.from(uniqueValues));  

    proxyData.newProperty = "New Value";  

     
    const { status, nonExistent = "default value" } = proxyData;
    print(`Status: ${status}, Non-existent: ${nonExistent}`);
})();
