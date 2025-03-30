 
import fs from 'fs/promises';
import crypto from 'crypto';

 
(async function() {
     
    const registry = new FinalizationRegistry((heldValue) => {
        print(`Finalized: ${heldValue}`);
    });

    let obj = {};
    const weakRef = new WeakRef(obj);
    registry.register(obj, 'myObject');
    
    obj = null;  

     
    try {
        await fs.writeFile('example.txt', 'This is a sample file.');
        const data = await fs.readFile('example.txt', 'utf8');
        print(`File content: ${data}`);
    } catch (err) {
        console.error('Error:', err);
    }

     
    const uniqueId = crypto.randomUUID();
    print(`Generated UUID: ${uniqueId}`);

     
    const handler = {
        get(target, prop) {
            if (prop === 'secret') {
                return 'Access Denied';
            }
            return Reflect.get(...arguments);
        }
    };

    const secureObject = new Proxy({ value: 42, secret: 'classified' }, handler);
    print(`Value: ${secureObject.value}`);
    print(`Secret: ${secureObject.secret}`);

     
    setTimeout(() => {
        print('This is an async timeout message.');
    }, 1000);
})();
