 

 
 
 

 
const processData = async (data) => {
     
    return new Promise((resolve) => setTimeout(() => resolve(data.map(item => item * 2)), 1000));
};

 
async function fetchDataAndProcess() {
     
    const rawData = [1, 2, 3, 4, 5];
    
     
    const processedData = await processData(rawData);
    
     
    const [first, second, ...rest] = processedData;
    
     
    print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);
}

 
fetchDataAndProcess().catch(error => console.error('Error:', error));
