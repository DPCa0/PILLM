 
import { readFile } from 'fs/promises';

 
async function readConfigFile(filePath) {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error reading config file');
    }
}

 
const configValidator = {
    set(target, prop, value) {
        if (prop === 'port' && (typeof value !== 'number' || value <= 0 || value > 65535)) {
            throw new Error('Invalid port number');
        }
        target[prop] = value;
        return true;
    }
};

 
async function main() {
    const configFile = './config.json';
    
     
    const { host = 'localhost', port = 3000, ...otherConfig } = await readConfigFile(configFile);

     
    const config = new Proxy({ host, port, ...otherConfig }, configValidator);

    try {
        config.port = 8080;  
        print(`Server is running on ${config.host}:${config.port}`);
        
         
        config.port = -1;  
    } catch (error) {
        console.error(error.message);
    }
}

 
(async () => {
    try {
        await main();
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
