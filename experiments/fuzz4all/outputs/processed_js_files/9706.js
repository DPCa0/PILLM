 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Fetched Data' });
        }, 1000);
    });
}

 
const handler = {
    get: (target, property, receiver) => {
        print(`Property '${property}' was accessed.`);
        return Reflect.get(target, property, receiver);
    },
    set: (target, property, value, receiver) => {
        print(`Property '${property}' was set to '${value}'.`);
        return Reflect.set(target, property, value, receiver);
    }
};

const dataProxy = new Proxy({ data: null }, handler);

 
const metaDataTag = Symbol('meta');

async function complexFunction() {
    const fetched = await fetchData();

     
    dataProxy.data = fetched.data;
    print(dataProxy.data);

     
    dataProxy[metaDataTag] = { timestamp: new Date() };

     
    const symbols = Object.getOwnPropertySymbols(dataProxy);
    for (const sym of symbols) {
        print(`Symbol: ${sym.toString()}, Value: ${JSON.stringify(dataProxy[sym])}`);
    }
}

complexFunction();
