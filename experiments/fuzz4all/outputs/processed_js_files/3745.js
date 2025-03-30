 

 
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

 
async function getData(url) {
    try {
        const data = await fetchData(url);
        print(data);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield getData(url);
    }
}

 
const handler = {
    get: function(target, property) {
        print(`Accessing URL: ${target[property]}`);
        return target[property];
    }
};

 
const urls = new Proxy(['http://api.example.com', 'http://api.another.com'], handler);

 
const generator = dataGenerator(urls);
for (const _ of urls) {
    generator.next();
}
