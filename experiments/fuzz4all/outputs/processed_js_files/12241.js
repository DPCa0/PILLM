 

(async () => {
     
    const fetchData = () => new Promise((resolve) => setTimeout(() => resolve({ message: "Hello, advanced JavaScript!" }), 1000));

     
    const data = await fetchData();

     
    const handler = {
        get: (target, prop) => {
            if (prop === 'message') {
                return target[prop].toUpperCase();  
            }
            return target[prop];
        }
    };

    const proxyData = new Proxy(data, handler);

     
    const { message, ...rest } = proxyData;

     
    print(`Fetched Message: ${message ?? 'No message available'}`);
    print(`Other Data: ${JSON.stringify(rest)}`);
})();
