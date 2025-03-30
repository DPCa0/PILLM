 
import { readFileSync } from 'fs';

 
async function complexOperation() {
    const filePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const data = readFileSync('./data.txt', 'utf8');
                resolve(data);
            } catch (error) {
                reject('Error reading file');
            }
        }, 1000);
    });

     
    const [fileData, apiData] = await Promise.all([
        filePromise,
        fetch('https://api.exapmle.com/data').then(response => response.json())
    ]);

    print(`File Data: ${fileData}`);
    print(`API Data: ${JSON.stringify(apiData)}`);

     
    const dataMap = new Map();
    dataMap.set('file', fileData);
    dataMap.set('api', apiData);

     
    for (const [key, value] of dataMap.entries()) {
        print(`${key}: ${JSON.stringify(value)}`);
    }
}

 
const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : `Property ${prop} doesn't exist`;
    }
};

const targetObj = { existingProp: 'I exist' };
const proxyObj = new Proxy(targetObj, handler);

print(proxyObj.existingProp);  // Output: I exist
print(proxyObj.nonExistingProp);  // Output: Property nonExistingProp doesn't exist

 
complexOperation().catch(console.error);
