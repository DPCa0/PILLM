 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5], meta: { info: 'Sample data' } });
        }, 1000);
    });
}

 
async function processData() {
    try {
        const url = 'https://api.sample.com/data';
        const response = await fetchData(url);

         
        const { data, meta } = response;

        print(`Meta Info: ${meta.info}`);

         
        const transformedData = data
            .map(num => num * 2)
            .filter(num => num > 5);

        print(`Transformed Data: ${transformedData}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
class Utility {
    static log(message) {
        print(`Utility Log: ${message}`);
    }
}

 
(async () => {
    await processData();
    Utility.log('Process completed successfully');
})();
