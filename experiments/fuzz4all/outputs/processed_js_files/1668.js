 

 
const target = {
    async *fetchData() {
        const data = [1, 2, 3, 4, 5];
        for (const item of data) {
            await new Promise(resolve => setTimeout(resolve, 100));
            yield item * 2;  
        }
    }
};

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property: ${prop}`);
            return obj[prop];
        } else {
            print(`Property not found: ${prop}`);
            return undefined;
        }
    }
};

 
const proxy = new Proxy(target, handler);

 
async function processData() {
    const dataGen = proxy.fetchData();
    for await (const item of dataGen) {
        print(`Processed item: ${item}`);
    }
}

 
processData();
