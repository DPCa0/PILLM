 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: 'Sample Data' });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
async function getData() {
    try {
        print('Fetching data...');
        const response = await fetchData('https://api.example.com/data');
        print('Data received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(...arguments);
    }
};

 
const dataObject = {
    info: 'Initial Info'
};

const proxyObject = new Proxy(dataObject, handler);

 
(async function() {
    const data = await getData();
    if (data) {
        proxyObject.info = data;  
        print(proxyObject.info);  
    }
})();
