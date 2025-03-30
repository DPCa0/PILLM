 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: `Fetched data from ${url}` };
            Math.random() > 0.1 ? resolve(data) : reject('Fetch error');
        }, 1000);
    });
}

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessing property "${property}" with value "${target[property]}"`);
            return target[property];
        } else {
            return `Property "${property}" does not exist`;
        }
    }
};

 
const targetObject = {
    name: "Advanced JS",
    version: "1.0"
};

 
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
    try {
        print('Starting data fetch...');
        const data = await fetchData('https://api.example.com/data');
        print(data.message);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

     
    print(proxyObject.name);
    print(proxyObject.version);
    print(proxyObject.nonExistentProp);
})();
