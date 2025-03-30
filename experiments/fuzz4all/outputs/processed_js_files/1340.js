 
import fs from 'fs/promises';

 
(async () => {
    try {
         
        const data = await fs.readFile('./data.json', 'utf-8');
        const jsonData = JSON.parse(data);

         
        const uniqueNames = new Set(jsonData.map(item => item.name));

         
        const nameMap = new Map();
        jsonData.forEach(item => {
            nameMap.set(item.id, item.name.toUpperCase());
        });

         
        const handler = {
            get: (target, prop) => {
                print(`Accessing property "${prop}"`);
                return target[prop];
            },
            set: (target, prop, value) => {
                print(`Setting property "${prop}" to "${value}"`);
                target[prop] = value;
                return true;
            }
        };

        const proxyObj = new Proxy({ exampleProperty: 'exampleValue' }, handler);
        print(proxyObj.exampleProperty);
        proxyObj.exampleProperty = 'newValue';

         
        print('Unique Names:', [...uniqueNames]);
        print('Names Map:', [...nameMap.entries()]);
    } catch (error) {
        console.error('Error:', error);
    }
})();
