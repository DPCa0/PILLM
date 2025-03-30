 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
}

 
function* dataFetcher(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
const specialProp = Symbol('special');

 
const obj = {
    [specialProp]: 'This is special',
    normalProp: 'Just normal',
};

const proxiedObj = new Proxy(obj, {
    get(target, prop) {
        print(`Accessing property: ${prop.toString()}`);
        return target[prop];
    },
});

 
(async function() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const generator = dataFetcher(urls);

    for (let fetchPromise of generator) {
        const response = await fetchPromise;
        print(response.data);
    }

     
    print(proxiedObj[specialProp]);
    print(proxiedObj.normalProp);
})();
