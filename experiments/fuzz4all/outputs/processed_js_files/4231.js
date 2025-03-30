 

 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.map(item => ({...item, processedAt: new Date().toISOString()}));
}

 
const handler = {
    get(target, property) {
        return property in target ? target[property] : `Property ${property} does not exist`;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
function* numberSequence(start = 0, end = 10) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const uniqueValues = new Set([1, 2, 3, 4, 5, 5, 3]);
const valueMap = new Map();
valueMap.set('key1', 'value1');
valueMap.set('key2', 'value2');

 
const processArray = ([first, ...rest]) => ({
    first,
    restLength: rest.length,
    uniqueRestValues: [...new Set(rest)]
});

 
function performOperations() {
    const promises = [
        Promise.resolve(3),
        Promise.reject('Failed operation'),
        Promise.resolve(7)
    ];
    
    return Promise.allSettled(promises);
}

 
(async () => {
    print('Proxy Example:', proxy.a, proxy.c);
    print('Unique Values:', uniqueValues);
    print('Map Value for key1:', valueMap.get('key1'));

    const numSeq = numberSequence(1, 5);
    print('Number Sequence:', [...numSeq]);

    print('Processed Array:', processArray([1, 2, 3, 4, 5, 5, 3]));

    const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos');
    print('API Data:', apiData.slice(0, 3));

    const operationsResult = await performOperations();
    print('Operations Result:', operationsResult);
})();
