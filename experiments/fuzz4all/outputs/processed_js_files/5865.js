 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, data: 'Sample Data' });
        }, 1000);
    });
}

 
async function processData() {
    try {
        const data = await fetchData();
        print('Data fetched:', data);

         
        const dataMap = new Map();
        dataMap.set(data.id, data.data);

        const transformedData = [...dataMap.entries()].map(([id, data]) => ({
            identifier: id,
            content: data.toUpperCase(),
        }));

        print('Transformed Data:', transformedData);

         
        return transformedData;
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    },
};

 
const observableData = new Proxy({}, handler);

async function main() {
    const result = await processData();

    if (result && result.length) {
         
        observableData.firstEntry = result[0];
        print('First entry in observableData:', observableData.firstEntry);
    }
}

main();
