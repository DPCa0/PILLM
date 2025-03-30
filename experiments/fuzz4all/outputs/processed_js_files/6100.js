 
async function* fetchAndProcessData(urls) {
    for (const url of urls) {
         
        const response = await fetch(url);
        const data = await response.json();
        
         
        const { id, ...rest } = data;
        
         
        const dataProxy = new Proxy(rest, {
            get: (target, prop) => {
                print(`Accessed property "${prop}"`);
                return target[prop];
            }
        });

        yield { id, dataProxy };
    }
}

 
(async () => {
     
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

     
    for await (const { id, dataProxy } of fetchAndProcessData(urls)) {
        print(`Post ID: ${id}`);
         
        print(`Post Title: ${dataProxy.title}`);
    }
})();
