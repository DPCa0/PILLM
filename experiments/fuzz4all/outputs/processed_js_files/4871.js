 
import { readFile } from 'fs/promises';

 
async function loadConfig() {
    try {
        const data = await readFile(new URL('./config.json', import.meta.url), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error loading config:", err);
        throw new Error("Configuration load failed");
    }
}

 
function fetchData(urls) {
    return Promise.all(urls.map(url =>
        fetch(url).then(response => response.json())
    ));
}

 
const configValidator = {
    set(obj, prop, value) {
        if (prop === 'port' && typeof value !== 'number') {
            throw new TypeError('Port must be a number');
        }
        obj[prop] = value;
        return true;
    }
};

 
async function initialize({ appName = "MyApp", port = 3000 } = {}) {
    const config = new Proxy(await loadConfig(), configValidator);
    
    config.appName = appName;
    config.port = port;

    print(`Initializing ${config.appName} on port ${config.port}`);
    
     
    const [apiData, ...others] = await fetchData([
        'https://api.example.com/data',
        'https://api.example.com/otherData'
    ]);

    print('API Data:', apiData);
    print('Other Data:', others);
}

 
(async () => {
    try {
        await initialize({ appName: "AdvancedJSApp", port: 8080 });
    } catch (err) {
        console.error("Initialization failed:", err);
    }
})();
