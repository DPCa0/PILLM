 

 
const swap = ([a, b]) => [b, a];

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

 
const measureExecutionTime = (fn) => {
    return async function(...args) {
        const start = performance.now();
        const result = await fn(...args);
        const end = performance.now();
        print(`${fn.name} executed in ${end - start}ms`);
        return result;
    };
};

 
const multiply = (a) => (b) => a * b;

 
const processData = async (urls) => {
    const results = new Map();
    const promises = urls.map((url) =>
        fetchData(url)
            .then((data) => results.set(url, data))
            .catch(() => results.set(url, 'Error'))
    );

    await Promise.all(promises);

    const uniqueResults = new Set(results.values());
    return uniqueResults;
};

 
(async () => {
    const urlList = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const fetchDataWithTime = measureExecutionTime(fetchData);

     
    let [x, y] = [5, 10];
    [x, y] = swap([x, y]);
    print(`Swapped: x=${x}, y=${y}`);

     
    const uniqueData = await processData(urlList);
    print('Unique data entries:', uniqueData);

     
    const triple = multiply(3);
    print(`Triple of 5 is: ${triple(5)}`);

     
    await fetchDataWithTime('https://api.example.com/sample');
})();
