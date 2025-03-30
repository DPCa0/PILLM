 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    try {
         
        const responses = await Promise.all(urls.map(url => fetch(url)));
        
         
        const hasError = responses.some(response => !response.ok);
        if (hasError) {
            throw new Error('Failed to fetch some data');
        }
        
         
        const dataPromises = responses.map(response => response.json());
        const data = await Promise.all(dataPromises);
        
         
        data.forEach(({ title }, index) => {
            print(`Post ${index + 1}: ${title}`);
        });

         
        await delay(1000);
        print('Processing complete');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

 
(async () => {
    print('Fetching data...');
    await fetchDataAndProcess();
})();
