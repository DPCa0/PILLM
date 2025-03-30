 
(async function() {
     
    const fs = await import('fs').then(module => module.promises);

     
    const fileSystemHandler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {
                print(`Calling ${propKey} with arguments: ${JSON.stringify(args)}`);
                return origMethod.apply(target, args);
            };
        }
    };

    const proxiedFs = new Proxy(fs, fileSystemHandler);

     
    try {
        const data = await proxiedFs.readFile('./example.txt', 'utf8');
        print(`File content: ${data}`);

        const reversedData = data.split('').reverse().join('');
        await proxiedFs.writeFile('./reversed_example.txt', reversedData, 'utf8');
        print('Reversed file content written successfully.');
    } catch (error) {
        console.error('Error with file operations:', error);
    }
})();

Note: The code assumes it is running in a Node.js environment with access to the 'fs' module. Make sure `example.txt` exists in the same directory or adjust the path as needed.