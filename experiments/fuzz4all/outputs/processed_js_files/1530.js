 
(async () => {
    const fs = await import('fs').then(module => module.promises);

     
    const readFileAsync = async (filePath) => {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return data;
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    };

     
    const handler = {
        get: (target, property) => {
            print(`Accessing property ${property}`);
            return target[property];
        },
        set: (target, property, value) => {
            print(`Setting property ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    };

    const config = {
        filePath: './sample.txt',
        encoding: 'utf-8'
    };

    const configProxy = new Proxy(config, handler);

     
    const greeting = (name) => `Hello, ${name}! Welcome to advanced JavaScript.`;
    print(greeting('Developer'));

     
    const filePath = configProxy?.filePath ?? 'default.txt';
    const data = await readFileAsync(filePath);

    if (data) {
        print('File content:', data);
    } else {
        print('No data retrieved from file.');
    }
})();
