 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    await delay(1000);  
    return { data: `Data from ${url}`, timestamp: Date.now() };
}

 
const PRIVATE_DATA = Symbol('privateData');

 
const createProxiedObject = () => {
    const targetObject = {
        [PRIVATE_DATA]: 'This is hidden',
        visibleData: 'This data is visible'
    };
    
    return new Proxy(targetObject, {
        get(target, prop, receiver) {
            if (prop === PRIVATE_DATA) {
                return 'Access Denied';
            }
            return Reflect.get(target, prop, receiver);
        }
    });
};

 
(async () => {
    try {
        print('Fetching data...');
        const result = await fetchData('https://example.com/api');
        print(result);

        const proxiedObject = createProxiedObject();
        print('Visible Data:', proxiedObject.visibleData);
        print('Private Data:', proxiedObject[PRIVATE_DATA]);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
