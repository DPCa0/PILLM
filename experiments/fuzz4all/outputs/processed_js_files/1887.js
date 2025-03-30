 

const fakeApiCall = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        url.includes('error') ? reject('Error fetching data') : resolve({ data: `Response from ${url}` });
    }, 1000);
});

async function fetchData(url) {
    try {
        const response = await fakeApiCall(url);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const apiHandler = {
    get: (target, property) => {
        return async (...args) => {
            print(`Calling ${property} with`, ...args);
            return fetchData(property);
        }
    }
};

const api = new Proxy({}, apiHandler);

(async () => {
    try {
        const data = await api['http://example.com/data']();
        print('Data:', data);
    } catch (error) {
        console.error('Caught error:', error.message);
    }

    try {
        const errorData = await api['http://example.com/error']();
        print('Error Data:', errorData);
    } catch (error) {
        console.error('Caught error:', error.message);
    }
})();
