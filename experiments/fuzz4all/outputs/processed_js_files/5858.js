 
class DataTransformer {
    constructor(data) {
        this.data = data;
    }

     
    transformData(...functions) {
        return functions.reduce((acc, fn) => fn(acc), this.data);
    }
}

 
function* flatten(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* flatten(item);
        } else {
            yield item;
        }
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, [2, [3, 4]], 5]);
        }, 1000);
    });
}

 
(async () => {
    const data = await fetchData();
    const transformer = new DataTransformer(data);

    const transformedData = transformer.transformData(
        data => Array.from(flatten(data)),  
        data => data.map(x => x * 2),  
        data => data.filter(x => x % 3 === 0)  
    );

    print(transformedData);  
})();
