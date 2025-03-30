 

const simulateAPICall = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({
                    status: 200,
                    data: { id: 1, name: 'John Doe', age: 30 }
                });
            } else {
                reject({ status: 404, message: 'Not Found' });
            }
        }, 1000);
    });
};

const fetchData = async (url) => {
    try {
        const { status, data } = await simulateAPICall(url);
        if (status === 200) {
            return data;
        }
    } catch ({ message }) {
        console.error(`Error: ${message}`);
    }
};

const processData = ({ name, ...rest }) => {
    print(`Processing data for ${name}...`);
    return { name, ...rest, processed: true };
};

const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            console.warn(`Property ${prop} does not exist`);
            return null;
        }
    }
};

(async () => {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);

    const proxyData = new Proxy(processedData, handler);
    print(`User Name: ${proxyData.name}`);
    print(`User Age: ${proxyData.age}`);
    print(`User Processed: ${proxyData.processed}`);
    print(`Non-Existent Property: ${proxyData.nonExistentProp}`);
})();
