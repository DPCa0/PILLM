 
import { promises as fs } from 'fs';

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Sample Data from Network" });
        }, 1000);
    });
}

 
const dataHandler = {
    get: function(target, property) {
        print(`Accessing property '${property}'`);
        return target[property];
    }
};

async function run() {
     
    const response = await fetchData();
    
     
    const { data: fetchedData } = response;

     
    const proxyData = new Proxy({ fetchedData }, dataHandler);

     
    const taggedLiteral = (strings, value) => `${strings[0]}**${value}**${strings[1]}`;
    print(taggedLiteral`Network data is: ${proxyData.fetchedData}`);

     
    const uniqueValues = new Set(['apple', 'banana', 'apple', 'orange']);
    uniqueValues.add('banana');
    print(`Unique Values: ${Array.from(uniqueValues).join(', ')}`);

     
    print(`Data: ${proxyData?.fetchedData ?? 'No data available'}`);

     
    await fs.writeFile('output.txt', `Output Data: ${proxyData.fetchedData}`, 'utf8');
    print('Data written to file successfully');
}

run().catch(console.error);
