 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess() {
     
    const { value1, value2 } = await getData();

     
    print(`Fetched values: ${value1} and ${value2}`);

     
    const uniqueValues = new Set([value1, value2, value1]);
    const valueMap = new Map(uniqueValues.entries());

     
    const combinedValues = [...uniqueValues, ...uniqueValues];

     
    const doubledValues = combinedValues.map(value => value * 2);

    print('Doubled and combined values:', doubledValues);

     
    await delay(1000);

     
    const processedValue = valueMap.get(0)?.toString() ?? 'No Value';

    print('Processed Value:', processedValue);
}

 
async function getData() {
    await delay(500);
    return { value1: 42, value2: 1337 };
}

 
fetchDataAndProcess().catch(console.error);
