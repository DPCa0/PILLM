 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve(`Data from ${url}`);
            } else {
                reject(`Error fetching data from ${url}`);
            }
        }, 1000);
    });
}

 
async function fetchMultipleData(sources) {
    try {
         
        const results = await Promise.all(sources.map(source => fetchData(source)));
        print('All data fetched successfully:', results);
        return results;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
const logData = (...data) => {
    print(`Logging ${data.length} entries:`);
    data.forEach((entry, index) => {
        print(`Entry ${index + 1}:`, entry);
    });
};

 
(async () => {
    const sources = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
    const fetchedData = await fetchMultipleData(sources);
    if (fetchedData) {
        logData(...fetchedData);
    }
})();
