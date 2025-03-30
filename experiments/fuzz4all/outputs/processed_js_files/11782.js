 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        url ? resolve(`Data from ${url}`) : reject('URL not provided');
    }, 1000);
});

const fetchWithTimeout = (promise, ms) => {
    let id;
    const timeout = new Promise((_, reject) => {
        id = setTimeout(() => reject('Timed out'), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(id));
};

const target = {
    message: "Hello, world!"
};

const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : "Property not found"
};

const proxiedTarget = new Proxy(target, handler);

(async function() {
    try {
        const data = await fetchWithTimeout(fetchData('https://api.example.com'), 500);
        print(data);
    } catch (error) {
        console.error(error);
    }
    
    print(proxiedTarget.message);
    print(proxiedTarget.nonExistentProperty);
})();
