 
(async function() {
    const fs = await import('fs').then(module => module.promises);

     
    const handler = {
        get: function(target, property, receiver) {
            print(`Property accessed: ${property}`);
            return Reflect.get(...arguments);
        }
    };

     
    const config = new Proxy({ path: './data.txt', content: 'Hello, Proxy World!' }, handler);

     
    async function writeFile(path, content) {
        try {
            await fs.writeFile(path, content);
            print(`File written successfully to ${path}`);
        } catch (err) {
            console.error(`Error writing file: ${err}`);
        }
    }

     
    function format(strings, ...values) {
        return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
    }

     
    async function* readLines(path) {
        const data = await fs.readFile(path, 'utf-8');
        const lines = data.split(/\r?\n/);
        for (const line of lines) {
            yield line;
        }
    }

     
    const filePath = config?.path ?? './default.txt';

     
    await writeFile(filePath, config.content);

     
    for await (const line of readLines(filePath)) {
        print(format`Line: ${line}`);
    }
})();
