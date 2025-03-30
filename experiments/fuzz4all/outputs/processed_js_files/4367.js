const complexFeatureDemo = async () => {
     
    const fetchData = url => new Promise((resolve, reject) => {
        setTimeout(() => {
            url ? resolve(`Data from ${url}`) : reject('No URL provided');
        }, 1000);
    });

    const urls = new Set(['https://api1.example.com', 'https://api2.example.com']);
    
    try {
        const results = await Promise.all([...urls].map(async url => {
            const data = await fetchData(url);
            return { url, data };
        }));

         
        results.forEach(({ url, data }) => {
            print(`Fetched from ${url}: ${data}`);
        });
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }

     
    const target = { message: "Hello" };
    const handler = {
        get: (obj, prop) => {
            return Reflect.get(obj, prop) ? Reflect.get(obj, prop) : `Property ${prop} not found`;
        },
        set: (obj, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(obj, prop, value);
        }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.message);
    print(proxy.nonExistent);
    proxy.message = "Hello, Proxy!";
    print(proxy.message);

     
    const uniqueId = Symbol('id');
    proxy[uniqueId] = 12345;
    print(`Proxy unique ID: ${proxy[uniqueId]}`);
};

complexFeatureDemo();
