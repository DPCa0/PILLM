 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
    }, 1000);
});

 
function* arrayIterator(arr) {
    for (const item of arr) {
        yield item;
    }
}

 
async function processData() {
    const data = await fetchData();
    const iterator = arrayIterator(data);
    let result = 0;
    for (let value of iterator) {
        result += value;
    }
    return result;
}

 
const handler = {
    get: (obj, prop) => {
        if (prop === 'value') {
            return `The processed result is: ${obj[prop]}`;
        }
        return obj[prop];
    }
};

 
(async function main() {
    const result = await processData();
    const proxy = new Proxy({ value: result }, handler);
    print(proxy.value);
})();
