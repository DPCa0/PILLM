 
const fs = require('fs').promises;
const crypto = require('crypto');

 
(async () => {
    try {
         
        const data = await fs.readFile(__filename, 'utf8');
        
         
        const transform = (strings, ...values) => 
            strings.raw.reduce((acc, str, i) => acc + str + (values[i] || '').toUpperCase(), '');
        const transformedData = transform`File Data: ${data}`;
        
         
        const hash = crypto.createHash('sha256').update(transformedData).digest('hex');

         
        const logHandler = {
            get: (target, prop) => {
                print(`Property "${prop}" was accessed`);
                return target[prop];
            }
        };
        
        const objectToProxy = { hash, timestamp: new Date().toISOString() };
        const proxiedObject = new Proxy(objectToProxy, logHandler);
        
         
        print(`Hash: ${proxiedObject.hash}`);
        print(`Timestamp: ${proxiedObject.timestamp}`);

    } catch (error) {
        console.error('Error:', error);
    }
})();
