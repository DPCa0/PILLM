 
(async () => {
    const fs = await import('fs').then(mod => mod.promises);

     
    const dataHandler = {
        get(target, prop) {
            print(`Getting value for ${prop}`);
            return target[prop];
        },
        set(target, prop, value) {
            print(`Setting value for ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    };

    const config = new Proxy({ directory: './data', filename: 'output.txt' }, dataHandler);

     
    function logInfo(strings, ...values) {
        const timeStamp = new Date().toISOString();
        return `[${timeStamp}] ${strings.raw[0]}${values.join(' ')}`;
    }

    print(logInfo`Starting file operations...`);

    try {
         
        await fs.mkdir(config.directory, { recursive: true });

        const filePath = `${config.directory}/${config.filename}`;
        await fs.writeFile(filePath, 'Hello, world!', 'utf8');

         
        const initialData = { id: 1, name: 'John Doe' };
        const newData = { ...initialData, occupation: 'Developer' };

        await fs.appendFile(filePath, `\nUser Data: ${JSON.stringify(newData)}`, 'utf8');

         
        const additionalInfo = newData.address?.street ?? 'Address not available';
        print(logInfo`Additional Info: ${additionalInfo}`);
    } catch (error) {
        console.error(logInfo`An error occurred: ${error.message}`);
    }
})();
