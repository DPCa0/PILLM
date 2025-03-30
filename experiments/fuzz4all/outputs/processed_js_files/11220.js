 
(async () => {
    const { readFile } = await import('fs/promises');

     
    (async function readAndProcessFile() {
        try {
            const data = await readFile('./data.json', 'utf-8');

             
            const { users } = JSON.parse(data);

             
            const activeUsers = users
                .filter(({ active }) => active)
                .map(({ name, age }) => ({ name, age }));

             
            print(`Active Users: ${JSON.stringify(activeUsers, null, 2)}`);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    })();

     
    const handler = {
        get: (target, prop) => {
            print(`Accessing property "${prop}"`);
            return prop in target ? target[prop] : 42;  
        },
    };

    const user = new Proxy({ name: 'Alice', age: 30 }, handler);
    print(user.name);
    print(user.age);
    print(user.location);  

     
    async function* asyncNumberGenerator() {
        for (let i = 1; i <= 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield i;
        }
    }

     
    (async () => {
        const generator = asyncNumberGenerator();
        for await (const num of generator) {
            print(`Generated number: ${num}`);
        }
    })();
})();
