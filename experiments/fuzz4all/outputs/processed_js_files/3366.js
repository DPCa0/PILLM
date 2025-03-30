 

 
function* exponentialBackoff(maxRetries) {
    let attempts = 0;
    while (attempts < maxRetries) {
        yield Math.pow(2, attempts++);
    }
    return -1;  
}

 
async function fetchDataWithRetry(url, maxRetries = 5) {
    const backoff = exponentialBackoff(maxRetries);
    let result = backoff.next();
    
    while (!result.done) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;  
        } catch (error) {
            console.warn(`Attempt ${result.value}: ${error.message}`);
             
            await new Promise(resolve => setTimeout(resolve, result.value * 1000));
            result = backoff.next();  
        }
    }
    
    throw new Error('Failed to fetch data after maximum retries');
}

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    try {
        const data = await fetchDataWithRetry(url);
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})();
