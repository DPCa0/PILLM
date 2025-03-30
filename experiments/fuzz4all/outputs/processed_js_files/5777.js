 

 
function* fetchDataGenerator() {
    yield 'Fetching data from API...';
    yield new Promise(resolve => setTimeout(() => resolve('Data fetched: {"name": "John Doe", "age": 30}'), 2000));
}

 
async function processData() {
    const generator = fetchDataGenerator();
    print(generator.next().value);  

    const dataPromise = generator.next().value;  
    const data = await dataPromise;  
    print(data);  

    return JSON.parse(data);
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Property "${prop}" accessed, value: ${obj[prop]}`);
            return obj[prop];
        } else {
            console.warn(`Property "${prop}" not found!`);
            return undefined;
        }
    }
};

 
async function main() {
    try {
        const data = await processData();

         
        const proxiedData = new Proxy(data, handler);

         
        print(`User Name: ${proxiedData.name}`);  
        print(`User Age: ${proxiedData.age}`);  
        print(`User Address: ${proxiedData.address}`);  
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

main();  
