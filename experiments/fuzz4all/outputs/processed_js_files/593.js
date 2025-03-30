 
import fs from 'fs';

 
async function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

 
function* dataProcessor(data) {
    for (const line of data.split('\n')) {
        yield line.toUpperCase().trim();
    }
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return Reflect.get(target, prop);
        } else {
            throw new ReferenceError(`Property ${prop} does not exist.`);
        }
    }
};

 
(async function main() {
    try {
        const filePath = './sample.txt';  
        const data = await readFileAsync(filePath);
        const processedData = [...dataProcessor(data)];
        
        const proxyData = new Proxy(processedData, handler);
        
        print(proxyData[0]);  
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();

To run this code, make sure you have a file named `sample.txt` in the same directory with some sample content. Also, ensure you have Node.js installed to use the `fs` module and support for ES6 features like `import`.