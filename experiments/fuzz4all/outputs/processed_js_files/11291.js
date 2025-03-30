 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
(async () => {
     
    let data;
    try {
        data = await fs.readFile('example.txt', 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        return;
    }

     
    const processData = (input) => {
        const content = input?.toUpperCase() ?? 'DEFAULT CONTENT';
        return content.split('').reverse().join('');
    };

     
    const processedData = processData(data);

     
    const hash = crypto.createHash('sha256').update(processedData).digest('hex');

     
    const handler = {
        get: (target, property) => {
            print(`Property '${property}' has been accessed`);
            return target[property];
        },
        set: (target, property, value) => {
            print(`Property '${property}' has been set to '${value}'`);
            target[property] = value;
            return true;
        }
    };

    const proxy = new Proxy({ processedData, hash }, handler);

     
    print('Processed Data:', proxy.processedData);
    print('Hash:', proxy.hash);

     
    if (Math.random() > 0.5) {
        const { format } = await import('date-fns');
        print('Current Date:', format(new Date(), 'yyyy-MM-dd'));
    } else {
        print('Random condition not met for dynamic import.');
    }
})();
