 
(async () => {
    const fs = await import('fs/promises');
    
     
    const fsProxyHandler = {
        get(target, prop) {
            if (typeof target[prop] === 'function') {
                return async (...args) => {
                    print(`Calling ${prop} with arguments:`, args);
                    return await target[prop](...args);
                };
            }
            return target[prop];
        }
    };

    const loggingFs = new Proxy(fs, fsProxyHandler);

     
    const data = await (async () => {
         
        const [filename, content] = ['output.txt', 'Hello, Proxy World!'];

         
        await loggingFs.writeFile(filename, content, 'utf8');
        print(`Content written to ${filename}`);

         
        return await loggingFs.readFile(filename, 'utf8');
    })();

     
    const tag = (strings, ...values) => {
        return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
    };

     
    print(tag`File contains: ${data}`);
})();
