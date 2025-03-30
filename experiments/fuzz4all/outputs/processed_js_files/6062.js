 
import fetch from 'node-fetch';

 
async function fetchMultipleData(urls) {
    try {
         
        const responses = await Promise.all(urls.map(url => fetch(url)));
        
         
        const dataPromises = responses.map(async (response) => {
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
            return await response.json();
        });

         
        return await Promise.all(dataPromises);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
];

 
(async () => {
    const results = await fetchMultipleData(urls);
    print('Fetched Data:', results);

     
    const allTitles = [...new Set(results.map(result => result.title))];
    print('Unique Titles:', allTitles);

     
    const firstPostBody = results[0]?.body ?? 'No body available';
    print('First Post Body:', firstPostBody);

     
    const proxy = new Proxy(results[0], {
        get: (target, prop) => {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
    });

    print('Proxied Title Access:', proxy.title);
})();
