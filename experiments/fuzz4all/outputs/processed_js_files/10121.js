 
const fetchData = async (urls) => {
    try {
        const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
        const results = await Promise.allSettled(fetchPromises);
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                print(`Data from URL ${index + 1}:`, result.value);
            } else {
                console.error(`Error fetching data from URL ${index + 1}:`, result.reason);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const data = { key1: 'value1', key2: 'value2' };
const proxyData = new Proxy(data, handler);

 
const config = { server: { host: 'localhost', port: 8080 } };
const host = config.server?.host ?? 'defaultHost';

 
(async () => {
    proxyData.key1;  
    proxyData.key3 = 'value3';  

    print('Host:', host);

    await fetchData(['https://api.github.com', 'https://api.spacexdata.com/v4/launches/latest']);
})();
