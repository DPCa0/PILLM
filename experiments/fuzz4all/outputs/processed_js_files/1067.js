 
const fs = require('fs');
const http = require('http');

 
async function fetchData(url) {
    try {
         
        const data = await new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
            }).on('error', err => reject(err));
        });
        return JSON.parse(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const dynamicData = new Proxy({}, {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property "${prop}" is not available`);
            return null;
        }
    },
    set: (target, prop, value) => {
        print(`Setting value for ${prop}: ${value}`);
        target[prop] = value;
        return true;
    }
});

 
(async function({ url = 'http://jsonplaceholder.typicode.com/posts/1' } = {}) {
    const data = await fetchData(url);
    dynamicData.post = data;
    print('Fetched Data:', dynamicData.post);
    
     
    print('Non-existent property:', dynamicData.nonExistent);
    
     
    fs.writeFile('output.json', JSON.stringify(dynamicData.post, null, 2), err => {
        if (err) throw err;
        print('Data has been written to output.json');
    });
})();
