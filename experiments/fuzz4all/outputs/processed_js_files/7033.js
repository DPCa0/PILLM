 
const fetchData = async (endpoint) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === 'api/data') {
                resolve({ status: 200, data: [1, 2, 3, 4, 5] });
            } else {
                reject({ status: 404, error: 'Not Found' });
            }
        }, 1000);
    });
};

 
const dataHandler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    }
};

 
function* dataGenerator(data) {
    for (const item of data) {
        yield item * 2;  
    }
}

 
(async () => {
    try {
        const response = await fetchData('api/data');

        if (response.status === 200) {
            const dataProxy = new Proxy(response.data, dataHandler);

            print('Original data: ', dataProxy);

            const iterator = dataGenerator(dataProxy);
            for (const value of iterator) {
                print('Processed value:', value);
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
