 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(1000);
    return { name: "Alice", age: 30 };
}

const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        } else {
            console.warn(`Property ${property} doesn't exist`);
            return undefined;
        }
    }
};

async function process() {
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);

    print(`Name: ${proxiedData.name}`);   
    print(`Age: ${proxiedData.age}`);     
    print(`Nonexistent: ${proxiedData.nonexistent}`);  
}

process();
