 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
    await delay(1000);  
    return { name: 'Alice', age: 30 };
};

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return Reflect.get(target, prop);
        }
        print(`Property ${prop} doesn't exist!`);
        return undefined;
    }
};

const main = async () => {
    print("Fetching data...");
    const data = await fetchData();
    const proxyData = new Proxy(data, handler);

    // Using Symbol for unique property access
    const uniqueKey = Symbol('unique');
    proxyData[uniqueKey] = 'This is a unique value';

    print(`Name: ${proxyData.name}`);
    print(`Age: ${proxyData.age}`);
    print(`Unique: ${proxyData[uniqueKey]}`);
    print(`Non-existent: ${proxyData.nonExistentProp}`);  
};

main();
