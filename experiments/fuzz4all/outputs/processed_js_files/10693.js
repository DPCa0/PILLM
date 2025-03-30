 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const data = await fetchData(url);
        print(data);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
async function* asyncGenerator(urls) {
    for (let url of urls) {
        yield await getData(url);
    }
}

 
const urlHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw `URL ${prop} does not exist`;
        }
    }
};

 
const urls = new Proxy({
    google: 'https://www.google.com',
    facebook: 'https://www.facebook.com',
}, urlHandler);

 
(async function() {
    const generator = asyncGenerator(Object.values(urls));
    for await (let _ of generator) {
         
    }
})();
