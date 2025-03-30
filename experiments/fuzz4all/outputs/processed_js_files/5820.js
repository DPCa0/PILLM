 

 
async function* fetchData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    }
}

 
(async () => {
     
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

     
    for await (const { userId, id, title } of fetchData(urls)) {
         
        print(`User ${userId} created a post with ID ${id}: ${title}`);
        
         
        const transformedData = { ...{ userId, id, title }, summary: title.slice(0, 10) + '...' };
        print(`Transformed Data: ${JSON.stringify(transformedData)}`);
    }
})();
