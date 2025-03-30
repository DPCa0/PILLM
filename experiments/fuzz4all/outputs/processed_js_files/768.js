 
const configHandler = {
    get(target, prop, receiver) {
         
        const secretKey = Symbol.for('secret');
        if (prop === secretKey) {
            return 'This is a secret key';
        }
        if (prop in target) {
            return Promise.resolve(target[prop]);
        }
        return Promise.reject(new Error(`Property ${prop} does not exist`));
    },
    set(target, prop, value) {
        if (typeof value === 'string' && prop in target) {
            target[prop] = value.toUpperCase();  
            return true;
        }
        return false;
    }
};

const initialConfig = { apiUrl: 'https://api.example.com', apiKey: '123456' };
const configProxy = new Proxy(initialConfig, configHandler);

 
async function runConfigExample() {
    try {
        const apiUrl = await configProxy.apiUrl;
        print(`API URL: ${apiUrl}`);  

        configProxy.apiKey = 'abcdef';
        print(`API Key: ${initialConfig.apiKey}`);  

        const nonExistentProp = await configProxy.nonExistent;
    } catch (error) {
        console.error(error.message);  
    }

    const secretKey = Symbol.for('secret');
    print(configProxy[secretKey]);  
}

runConfigExample();
