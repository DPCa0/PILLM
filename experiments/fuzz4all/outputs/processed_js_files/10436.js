 
(async () => {
    const { readFile } = await import('fs/promises');
    const { createHash } = await import('crypto');

     
    async function hashFileContent(filePath) {
        try {
            const data = await readFile(filePath, 'utf8');
            
             
            const hash = createHash`sha256`.update(data).digest('hex');
            
             
            const logAccess = new Proxy({ hash }, {
                get(target, prop) {
                    print(`Accessed property: ${prop}`);
                    return target[prop];
                }
            });
            
            print(`Hash of file content: ${logAccess.hash}`);
        } catch (error) {
            console.error(`Error reading or hashing file: ${error}`);
        }
    }

     
    const filePath = Symbol.for('filePath');
    globalThis[filePath] = './example.txt';  

     
    hashFileContent(globalThis[filePath]);
})();
