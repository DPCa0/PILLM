(async () => {
     
    const fetchData = async (url) => {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };

     
    const createProxy = (target) => {
        return new Proxy(target, {
            get: (obj, prop) => {
                return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
            },
            set: (obj, prop, value) => {
                print(`Setting property ${prop} to ${value}`);
                obj[prop] = value;
                return true;
            }
        });
    };

     
    const fetchSimulatedData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ id: 1, name: 'Alice', job: 'Developer' });
            }, 2000);
        });
    };

     
    const displayUserInfo = ({ id = 0, name = 'Unknown', job = 'Unknown' } = {}) => {
        print(`User Info: ID=${id}, Name=${name}, Job=${job}`);
    };

     
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    let apiData = await fetchData(url);

     
    let proxyData = createProxy(apiData);

    print(`Fetched Data: `, proxyData.userId);  
    print(`Attempting to access non-existing property: `, proxyData.nonExisting);

     
    let simulatedData = await fetchSimulatedData();
    displayUserInfo(simulatedData);
})();
