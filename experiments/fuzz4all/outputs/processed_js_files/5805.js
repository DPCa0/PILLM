 

const fetchData = url => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            url === 'api/data'
                ? resolve({ data: [1, 2, 3, 4, 5], status: 200 })
                : reject(new Error('Not Found'));
        }, 1000);
    });
};

const dataHandler = {
    get: function(target, prop) {
        if (prop === 'count') {
            return target.data.length;
        }
        return Reflect.get(target, prop);
    }
};

async function processData(url) {
    try {
        const response = await fetchData(url);
        const proxiedData = new Proxy(response, dataHandler);
        print(`Data: ${proxiedData.data}`);
        print(`Count: ${proxiedData.count}`);
        print(`Status: ${proxiedData.status}`);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

processData('api/data');
