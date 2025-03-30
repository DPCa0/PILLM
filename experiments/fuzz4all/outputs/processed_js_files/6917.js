 

 
function getData() {
    return new Promise(resolve => {
        setTimeout(() => resolve(Math.random()), 1000);
    });
}

 
async function* asyncNumberGenerator(limit) {
    let count = 0;
    while (count < limit) {
        yield await getData();
        count++;
    }
}

 
const logHandler = {
    get(target, prop) {
        print(`Accessing property '${prop}'`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
const dataObject = {
    name: "RandomNumberContainer",
    numbers: []
};

 
const proxyData = new Proxy(dataObject, logHandler);

 
async function processData() {
    print("Starting to process data...");
    proxyData.name = "UpdatedNumberContainer";

    for await (const num of asyncNumberGenerator(5)) {
        proxyData.numbers.push(num);
        print(`Generated number: ${num}`);
    }

    print("All numbers generated:", proxyData.numbers);
}

 
processData();
