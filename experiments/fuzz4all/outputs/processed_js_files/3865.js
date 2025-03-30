 

 
async function fetchData(url) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(500);  
    return fetch(url).then(response => response.json());
}

 
function measureExecutionTime(asyncFunc) {
    return async (...args) => {
        const start = performance.now();
        const result = await asyncFunc(...args);
        const end = performance.now();
        print(`Execution time: ${(end - start).toFixed(2)} ms`);
        return result;
    };
}

 
function createCounter(initial = 0) {
    let count = initial;
    return {
        increment: () => ++count,
        decrement: () => --count,
        get count() {
            return count;
        }
    };
}

 
const mockApiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

 
const fetchWithTiming = measureExecutionTime(fetchData);

 
(async () => {
    const counter = createCounter(5);
    
    print('Initial Count:', counter.count);
    
    const [inc1, inc2, dec1] = [counter.increment(), counter.increment(), counter.decrement()];
    
    print('Updated Count:', counter.count);

    try {
        const { title, body, ...rest } = await fetchWithTiming(mockApiUrl);
        print('Post Title:', title);
        print('Post Body:', body);
        print('Other Post Data:', rest);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
