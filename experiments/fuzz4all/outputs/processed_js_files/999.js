 
import { readFileSync, writeFileSync } from 'fs';

 
async function asyncProcessFile() {
    try {
        const data = await new Promise((resolve, reject) => {
            readFileSync('./example.txt', 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        const transformedData = data.toUpperCase();

        await new Promise((resolve, reject) => {
            writeFileSync('./output.txt', transformedData, (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        print('File processed successfully');
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

 
function mapData() {
    const map = new Map();
    map.set('key1', { value: 1 })
        .set('key2', { value: 2 })
        .set('key3', { value: 3 });

    const result = [...map.values()].reduce((acc, item) => acc + item.value, 0);
    print('Total value:', result);
}

 
const target = {
    message: "Hello, Proxy!",
};

const handler = {
    get: function (obj, prop) {
        print(`Getting property: ${prop}`);
        return prop in obj ? obj[prop] : "Property not found";
    },
    set: function (obj, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    },
};

const proxy = new Proxy(target, handler);
print(proxy.message);
proxy.newProp = "New Value";
print(proxy.newProp);

 
function processArray([first, second = 2, ...rest]) {
    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
}

processArray([1, undefined, 3, 4, 5]);

 
asyncProcessFile();
mapData();
