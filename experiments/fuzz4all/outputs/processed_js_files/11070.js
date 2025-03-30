 
const fs = require('fs').promises;
const { promisify } = require('util');
const crypto = require('crypto');

 
const setTimeoutPromise = promisify(setTimeout);

 
const readAndHashFile = async (filePath) => {
    try {
         
        const data = await fs.readFile(filePath, 'utf8');
        
         
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        
         
        await setTimeoutPromise(1000);
        
        return hash;
    } catch (error) {
        console.error('Error:', error);
    }
};

 
(async () => {
    const filePath = 'sample.txt';  
    const fileHash = await readAndHashFile(filePath);
    
    if (fileHash) {
        print(`File Hash: ${fileHash}`);
    }
})();

 
const target = { message: 'Hello, Proxy!' };

const handler = {
    get: (obj, prop) => {
        if (prop === 'shout') {
            return obj.message.toUpperCase();
        }
        return Reflect.get(obj, prop);
    }
};

const proxy = new Proxy(target, handler);

print(proxy.message);  
print(proxy.shout);    

 
const uniqueValues = new Set([1, 2, 2, 3, 4]);
uniqueValues.add(5);

for (const value of uniqueValues) {
    print(value);  
}

 
const map = new Map();
map.set('a', 1);
map.set('b', 2);

for (const [key, value] of map) {
    print(`${key} => ${value}`);  
}

 
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${