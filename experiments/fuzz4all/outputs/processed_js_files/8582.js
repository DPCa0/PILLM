 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 'Sample data', status: 200 });
        }, 1000);
    });
};

 
const handler = {
    get: (target, property) => {
        print(`Getting property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const asyncFunction = async () => {
    const proxyData = new Proxy({ data: null, status: null }, handler);
    try {
        const response = await fetchData();
        proxyData.data = response.data;
        proxyData.status = response.status;
        print(`Data fetched: ${proxyData.data}, Status: ${proxyData.status}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

asyncFunction();
