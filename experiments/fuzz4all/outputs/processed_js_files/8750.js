 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData() {
    const data = ['apple', 'banana', 'cherry'];

    for (const item of data) {
        await delay(1000);  
        yield item.toUpperCase();  
    }
}

 
const loggingHandler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    }
};

const proxyData = new Proxy({ message: 'Hello from Proxy' }, loggingHandler);

 
async function main() {
    print(proxyData.message);
    
    const dataIterator = fetchData();
    for await (const item of dataIterator) {
        print(`Fetched data: ${item}`);
    }
}

 
main().catch(err => console.error(err));
