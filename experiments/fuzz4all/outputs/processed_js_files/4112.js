 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const measureExecutionTime = asyncFunc => async (...args) => {
    console.time('Execution Time');
    const result = await asyncFunc(...args);
    console.timeEnd('Execution Time');
    return result;
};

 
const fetchData = async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

 
const handler = {
    apply: (target, thisArg, args) => {
        print(`Calling fetchData with args: ${args}`);
        return target.apply(thisArg, args);
    }
};

const proxiedFetchData = new Proxy(fetchData, handler);

 
const composeAsync = (...fns) => 
    fns.reduceRight((prevFn, nextFn) => async value => await nextFn(await prevFn(value)));

 
const transformData = async data => {
    return {
        ...data,
        transformed: true
    };
};

 
const processData = composeAsync(
    measureExecutionTime(proxiedFetchData),
    transformData
);

 
(async () => {
    try {
        const data = await processData('https://jsonplaceholder.typicode.com/todos/1');
        print('Final Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
