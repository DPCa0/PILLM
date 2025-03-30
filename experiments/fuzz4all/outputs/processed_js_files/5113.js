 
const fs = require('fs').promises;

 
async function complexProgram() {
    try {
         
        const [a, b, ...rest] = [1, 2, 3, 4, 5];
        const sum = a + b + rest.reduce((acc, num) => acc + num, 0);
        print(`Sum of array: ${sum}`);

         
        const { format } = await import('date-fns');
        print(`Current date: ${format(new Date(), 'yyyy-MM-dd')}`);

         
        const handler = {
            get: (target, prop) => prop in target ? target[prop] : `Property ${prop} not found`
        };
        const proxy = new Proxy({ name: "Complex Object" }, handler);
        print(proxy.name);
        print(proxy.age);

         
        const promises = [
            fs.writeFile('file1.txt', 'Hello, World!'),
            fs.writeFile('file2.txt', 'Advanced JavaScript!')
        ];
        await Promise.all(promises);
        print('Files written successfully');

         
        const map = new Map([['key1', 1], ['key2', 2]]);
        map.forEach((value, key) => print(`${key}: ${value}`));

    } catch (error) {
        console.error('Error:', error);
    }
}

 
complexProgram();
