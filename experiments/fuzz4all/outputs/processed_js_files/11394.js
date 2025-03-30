const crypto = require('crypto');
const fs = require('fs').promises;

 
async function generateSecureString(length) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(length, (err, buffer) => {
            if (err) reject(err);
            resolve(buffer.toString('hex'));
        });
    });
}

 
const handler = {
    get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return obj[prop];
    }
};

const targetObject = { secret: "TopSecret", name: "ProxyObject" };
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
    try {
        const [randomString, proxyName] = await Promise.all([
            generateSecureString(16),
            Promise.resolve(proxyObject.name)
        ]);

        print(`Generated Secure String: ${randomString}`);
        print(`Proxy Object Name: ${proxyName}`);
        
        const data = `Secure Data: ${randomString}\nObject Name: ${proxyName}`;
        await fs.writeFile('secureData.txt', data, 'utf8');

        print('Data written to secureData.txt');
    } catch (error) {
        console.error('Error:', error);
    }
})();
