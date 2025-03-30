 
'use strict';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexFunction() {
     
    const dataMap = new Map([['key1', 10], ['key2', 20], ['key3', 30]]);

     
    const [key1Value, key2Value] = [dataMap.get('key1'), dataMap.get('key2')];

     
    print(`Values: key1 = ${key1Value}, key2 = ${key2Value}`);

     
    const uniqueValues = new Set([...dataMap.values(), 10, 40]);

     
    print('Unique Values:', uniqueValues);

     
    const validator = {
        set(target, prop, value) {
            if (prop === 'important' && value < 0) {
                throw new Error('Value cannot be negative');
            }
            target[prop] = value;
            return true;
        }
    };

     
    const config = new Proxy({}, validator);
    config.important = 5;  
    try {
        config.important = -5;  
    } catch (e) {
        console.error(e.message);
    }

     
    const multiLineString = `This is a complex
JavaScript example that uses advanced
features like async/await, Proxy, Set,
and more. Sum of key1 and key2 is ${key1Value + key2Value}.`;

    print(multiLineString);

     
    await delay(1000);
    print('Finished after a delay');
}

 
complexFunction();
