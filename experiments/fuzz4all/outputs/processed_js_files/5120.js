(async function() {
    const delayedEcho = async (msg, delay) => new Promise(resolve => setTimeout(() => resolve(msg), delay));
    
    const fetchData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
        });
    };

    const processObjectWithProxy = () => {
        const target = {
            name: 'Advanced JS',
            version: 2023
        };
        
        const handler = {
            get: function(obj, prop) {
                if (prop === 'description') {
                    return `A proxy for ${obj.name} version ${obj.version}`;
                }
                return obj[prop];
            },
            set: function(obj, prop, value) {
                if (prop === 'version' && (typeof value !== 'number' || value < 2023)) {
                    throw new Error('Invalid version');
                }
                obj[prop] = value;
                return true;
            }
        };

        const proxy = new Proxy(target, handler);
        print(proxy.description);

        try {
            proxy.version = 2022;   
        } catch (e) {
            console.error(e.message);
        }
    };

    const main = async () => {
        print(await delayedEcho('Welcome to Advanced JavaScript Features!', 2000));
        
        const data = await fetchData();
        print(`Fetched Data: ${data.data}`);
        
        processObjectWithProxy();
    };

    main();
})();
