 
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
async function advancedFileOperation() {
    const filePath = join(__dirname, 'data.json');
    
     
    const data = JSON.stringify({
        timestamp: new Date().toISOString(),
        message: 'Hello, advanced JavaScript!',
    }, null, 2);
    
    try {
         
        await fs.writeFile(filePath, data, 'utf8');
        print(`Data successfully written to ${filePath}`);
        
         
        const fileContent = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        
         
        const { timestamp, message } = jsonData;
        print(`Timestamp: ${timestamp}, Message: ${message}`);
    } catch (err) {
        console.error('Error during file operations', err);
    }
}

 
advancedFileOperation();

 
const handler = {
    get: function(target, prop) {
        print(`Accessing property ${prop}`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const dataProxy = new Proxy({ name: 'JavaScript' }, handler);
dataProxy.name;  
dataProxy.version = 'ES2020';  
