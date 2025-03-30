 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
}

 
async function handleData(url) {
    try {
        let data = await fetchData(url);
        print(data);
    } catch (error) {
        console.error(error);
    }
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property "${prop}" is not available`;
        }
    }
};

 
const dataObj = { a: 1, b: 2, c: 3 };

 
const proxyData = new Proxy(dataObj, handler);

 
print(proxyData.a);  
print(proxyData.z);  

 
handleData('https://example.com/api/data');
handleData(null);  
