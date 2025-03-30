 

 
const fetchData = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
async function getData(urls) {
    const results = [];
    for (const url of urls) {
        const data = await fetchData(url);
        results.push(data);
    }
    return results;
}

 
function* processData(data) {
    for (const item of data) {
        yield `Processed ${item}`;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} does not exist`;
        }
    }
};

 
(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
    const data = await getData(urls);
    
     
    const processedData = processData(data);
    
     
    for (const item of processedData) {
        print(item);
    }
    
     
    const obj = { foo: 'bar', baz: 42 };
    const proxyObj = new Proxy(obj, handler);
    
    print(proxyObj.foo);      
    print(proxyObj.baz);      
    print(proxyObj.nonExistent);  
})();
