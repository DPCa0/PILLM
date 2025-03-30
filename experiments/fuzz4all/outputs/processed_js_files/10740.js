 
const fs = require('fs').promises;

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function readFileContent(fileName) {
    try {
        const content = await fs.readFile(fileName, 'utf-8');
        print(`File Content of ${fileName}:`, content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

 
const utility = {
    asyncProcess: async ({ fileName, delayTime, message }) => {
        print(message);
        await delay(delayTime);
        await readFileContent(fileName);
    }
};

 
const data = {
    fileName: 'example.txt',
    delayTime: 1000,
    message: 'Reading file in 1 second...',
};

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property ${prop} does not exist on target.`);
            return undefined;
        }
    }
};

const proxyData = new Proxy(data, handler);

 
(async () => {
     
    await fs.writeFile('example.txt', 'Hello, this is a sample file!');

     
    await utility.asyncProcess(proxyData);
})();
