 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const response = await fetchData(url);
        print(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const urlHandler = {
    get: function(target, prop) {
        print(`Fetching property '${prop}' from URL`);
        if (!prop.startsWith('http')) {
            throw new Error('Invalid URL');
        }
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting property '${prop}' to URL`);
        target[prop] = value;
        return true;
    }
};

 
const url = new Proxy({}, urlHandler);

 
url.endpoint = 'http://example.com/data';

 
getData(url.endpoint);

 
 
 
