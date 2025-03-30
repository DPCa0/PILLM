 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 'Fetched Data', status: 200 });
        }, 1000);
    });
};

 
async function getData() {
    try {
        const response = await fetchData();
        print(`Response: ${response.data} with status ${response.status}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const logDataWithTemplateLiterals = data => {
    print(`Logging Data: ${data}`);
};

 
(async () => {
    print('Starting data fetch...');
    await getData();
    logDataWithTemplateLiterals('Finished fetching and logging data');
})();
