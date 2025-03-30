 

 
const fetchData = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (id > 0) {
            resolve({ id, name: `Resource_${id}`, value: Math.random() });
        } else {
            reject('Invalid ID');
        }
    }, 1000);
});

 
async function processResources(ids) {
    try {
         
        const promises = ids.map(async id => {
            const resource = await fetchData(id);
            print(`Fetched:`, resource);
            return resource;
        });

         
        const resources = await Promise.all(promises);
        print('All resources fetched:', resources);

         
        const totalValue = resources.reduce((acc, { value }) => acc + value, 0);
        print(`Total Value: ${totalValue.toFixed(2)}`);
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}

 
const resourceIDs = [...Array(5).keys()].map(n => n + 1);
print(`Starting to fetch resources: ${resourceIDs.join(', ')}`);

 
processResources(resourceIDs);
