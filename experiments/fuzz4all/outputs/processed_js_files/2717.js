 

 
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

 
(async () => {
    try {
         
        const results = await Promise.allSettled([
            readFileAsync('file1.txt', 'utf8'),
            readFileAsync('file2.txt', 'utf8'),
            readFileAsync('file3.txt', 'utf8')
        ]);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                print(`Content of file${index + 1}:`, result.value);
            } else {
                print(`Error reading file${index + 1}:`, result.reason);
            }
        });
        
         
        const data = ['apple', 'banana', 'apple', 'orange', 'banana', 'kiwi'];
        const uniqueItems = new Set(data);
        const itemMap = new Map();

        uniqueItems.forEach(item => {
            const count = data.filter(fruit => fruit === item).length;
            itemMap.set(item, count);
        });

         
        for (const [key, value] of itemMap.entries()) {
            print(`Item: ${key}, Count: ${value}`);
        }

         
        const numbers = [1, 2, 3, 4, 5];
        const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
        print('Sum:', sum(...numbers));

         
        const config = { verbose: true, threshold: 10 };
        const { verbose = false, threshold = 5 } = config;
        print(`Verbose: ${verbose}, Threshold: ${threshold}`);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
