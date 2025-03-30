 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
    });
}

 
function* dataGenerator(data) {
    for (let item of data) {
        yield item.toUpperCase();
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            print(`${prop} does not exist.`);
            return null;
        }
    },
};

 
async function main() {
    const rawData = await fetchData();
    
    const proxyData = new Proxy({ ...rawData }, handler);

    const gen = dataGenerator(proxyData);
    
    for (const item of gen) {
        print(item);
    }

    print('Accessing non-existing property:', proxyData.nonExistentProp);
}

 
main();
