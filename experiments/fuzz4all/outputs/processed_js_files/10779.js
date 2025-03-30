 
(async () => {
    const fs = await import('fs/promises');

     
    const readConfig = async (filePath) => {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

     
    function* rangeGenerator(start, end, step = 1) {
        for (let i = start; i <= end; i += step) {
            yield i;
        }
    }

     
    const createLoggingProxy = (target) => {
        return new Proxy(target, {
            get: (obj, prop) => {
                print(`Accessing property "${prop}" with value: ${obj[prop]}`);
                return obj[prop];
            }
        });
    };

    const config = await readConfig('./config.json');
    if (config) {
        const loggingConfig = createLoggingProxy(config);

        print('Config settings:');
        print('Port:', loggingConfig.port);
        print('Environment:', loggingConfig.environment);
    }

     
    print('Range from 1 to 5:');
    for (const num of rangeGenerator(1, 5)) {
        print(num);
    }
})();
