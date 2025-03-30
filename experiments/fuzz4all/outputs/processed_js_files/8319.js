 

 
function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === 'user') {
                resolve({ id: 1, name: 'Jane Doe', role: 'admin' });
            } else {
                reject('Endpoint not found');
            }
        }, 1000);
    });
}

 
const apiProxyHandler = {
    get: (target, prop) => {
        if (typeof target[prop] === 'function') {
            return (...args) => {
                print(`Fetching data from ${args[0]}...`);
                return target[prop](...args)
                    .then(result => {
                        print('Data fetched successfully:', result);
                        return result;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        throw error;
                    });
            };
        }
        return target[prop];
    }
};

const api = new Proxy({ fetchData }, apiProxyHandler);

 
(async () => {
    try {
        const endpoint = 'user';
        const userData = await api.fetchData(endpoint);

         
        print(`User Info:\n- ID: ${userData.id}\n- Name: ${userData.name}\n- Role: ${userData.role}`);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();
