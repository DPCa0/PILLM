 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === 'valid') {
            resolve({ data: 'Fetched Data' });
        } else {
            reject(new Error('Invalid URL'));
        }
    }, 1000);
});

 
function* dataFetcher(urls) {
    for (let url of urls) {
        try {
            const result = yield fetchData(url);
            print(result.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

 
const handleRequests = async (urls) => {
    const generator = dataFetcher(urls);
    for (let result = generator.next(); !result.done; result = generator.next(await result.value)) {}
};

 
const safeAccessProxy = (obj) => new Proxy(obj, {
    get(target, prop) {
        return prop in target ? target[prop] : 'Property does not exist';
    }
});

 
const user = { name: 'Alice', age: 30 };
const safeUser = safeAccessProxy(user);
print(safeUser.name);  
print(safeUser.nonExistentProperty);  

 
handleRequests(['valid', 'invalid', 'valid']);

