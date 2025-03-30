 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
};

 
const withErrorHandling = (fn) => {
    return (...args) => {
        return fn(...args).catch((error) => {
            console.error('An error occurred:', error);
            throw error;   
        });
    };
};

 
const processData = async (data) => {
    print(`Processing: ${data}`);
    const processedData = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.toUpperCase());
        }, 500);
    });
    print(`Processed: ${processedData}`);
    return processedData;
};

 
(async () => {
    const fetchDataWithHandling = withErrorHandling(fetchData);
    const processDataWithHandling = withErrorHandling(processData);

    try {
        const data = await fetchDataWithHandling('https://api.example.com/data');
        await processDataWithHandling(data);
    } catch (error) {
        print('Handling error:', error);
    }
})();
