 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('URL not provided');
            }
        }, 1000);
    });
}

 
function* asyncGenerator(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
async function processUrls(generator) {
    const iterator = generator();
    for (let promise of iterator) {
        try {
            const data = await promise;
            print(data);
        } catch (error) {
            console.error(error);
        }
    }
}

 
const handler = {
    get: function(target, prop) {
        print(`Accessing property ${prop}`);
        return target[prop];
    }
};

const urls = new Proxy(['https://api.example.com', 'https://api.another.com'], handler);

 
processUrls(function*() { yield* asyncGenerator(urls); });
