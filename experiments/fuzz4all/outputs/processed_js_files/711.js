 

 
async function fetchData(url) {
    const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Fetched data from ${url}`);
        }, 1000);
    });
    return response;
}

 
const handler = {
    get: function(target, prop) {
        print(`Property '${prop}' has been accessed.`);
        return prop in target ? target[prop] : `No such property: ${prop}`;
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
const map = new Map();
map.set('url1', 'https://api.example.com/data1');
map.set('url2', 'https://api.example.com/data2');

const set = new Set();
set.add('https://api.example.com/data1');
set.add('https://api.example.com/data3');

 
const { a, b } = proxy;
print(`Destructured values: a = ${a}, b = ${b}`);

 
async function main() {
     
    for (const key of map.keys()) {
        print(`URL from map: ${map.get(key)}`);
    }

     
    for (const url of set) {
        const data = await fetchData(url);
        print(data);
    }
}

main().then(() => {
    print("Program executed successfully.");
});
