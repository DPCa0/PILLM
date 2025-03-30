 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
     
    await delay(1000);  

     
    const target = { data: 'Hello, Proxy World!' };
    const handler = {
        get: (obj, prop) => {
            if (prop === 'data') {
                return `${obj[prop]} (modified by Proxy)`;
            }
            return Reflect.get(...arguments);
        }
    };
    
    const proxy = new Proxy(target, handler);
    print(proxy.data);   
}

 
(async () => {
    print('Fetching data...');
    await fetchData();
    print('Data fetched!');
})();
