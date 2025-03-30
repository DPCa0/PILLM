 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess() {
     
    const data = await delay(1000).then(() => [1, 2, 3, 4, 5]);

     
    const [first, ...rest] = data;
    const processed = rest
        .filter(num => num % 2 === 0)  
        .map(num => num * 2);  

     
    print(`First element: ${first}, Processed data: ${processed.join(', ')}`);

     
    const target = { a: 1, b: 2 };
    const handler = {
        get: (obj, prop) => {
            print(`Getting ${prop}`);
            return prop in obj ? obj[prop] : 'Property does not exist';
        },
        set: (obj, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
        }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.a);  
    proxy.b = 4;  
    print(proxy.c);  

     
    const promise1 = delay(500).then(() => 'Promise 1 resolved');
    const promise2 = delay(1000).then(() => 'Promise 2 resolved');

    const results = await Promise.all([promise1, promise2]);
    print('All promises resolved:', results.join(', '));
}

 
(async () => {
    try {
        await fetchDataAndProcess();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
