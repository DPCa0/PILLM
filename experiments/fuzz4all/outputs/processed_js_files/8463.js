 
function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

 
const handler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Fetch called with arguments: ${argumentsList}`);
        return target.apply(thisArg, argumentsList);
    }
};

const proxiedFetchData = new Proxy(fetchData, handler);

 
(async () => {
    try {
         
        const [, , , fourth, fifth] = fibonacciSequence();
        print(`Fourth Fibonacci number is: ${fourth}`);
        print(`Fifth Fibonacci number is: ${fifth}`);

         
        const apiData = await proxiedFetchData('https://api.example.com/data');
        print(`Fetched Data: `, apiData);

         
        const dataMap = new Map(Object.entries(apiData));
        const uniqueValues = new Set(dataMap.values());

        print('Unique Values from API:', uniqueValues);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
