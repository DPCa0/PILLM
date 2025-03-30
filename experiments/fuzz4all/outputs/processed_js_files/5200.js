 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('URL not provided');
            }
        }, 1000);
    });
};

 
const createDefaultConfig = (defaults) => {
    return new Proxy(defaults, {
        get: (target, prop) => prop in target ? target[prop] : 'Not Specified',
    });
};

const config = createDefaultConfig({
    apiEndpoint: 'https://api.example.com',
    timeout: 5000
});

 
const processData = async (url) => {
    try {
        const data = await fetchData(url);
        print(`Fetched data: ${data}`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

 
(async () => {
    print('Configuration:', config);

    await processData(config.apiEndpoint);
    await processData();  

     
    const iterableObj = {
        data: [10, 20, 30],
        [Symbol.iterator]() {
            let index = 0;
            return {
                next: () => {
                    if (index < this.data.length) {
                        return { value: this.data[index++], done: false };
                    } else {
                        return { done: true };
                    }
                }
            };
        }
    };

    for (const value of iterableObj) {
        print(`Iterated value: ${value}`);
    }
})();
