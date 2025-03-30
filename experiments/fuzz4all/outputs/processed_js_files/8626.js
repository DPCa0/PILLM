 
(async () => {
    if (typeof window === 'undefined') {  
        globalThis.fetch = await import('node-fetch');  
    }

     
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch data: ${error}`);
        }
    };

     
    async function* fetchPages(url, startPage = 1, totalPages = 5) {
        for (let i = startPage; i <= totalPages; i++) {
            const pageUrl = `${url}?page=${i}`;
            yield await fetchData(pageUrl);
        }
    }

     
    const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

     
    const processPosts = async () => {
        const postSet = new Set();
        for await (const page of fetchPages(apiEndpoint, 1, 3)) {
            page.forEach(({ id, title }) => postSet.add(`ID: ${id}, Title: ${title}`));
        }
        return [...postSet];
    };

     
    const handler = {
        apply: async (target, thisArg, args) => {
            print('Fetching posts...');
            const result = await Reflect.apply(...arguments);
            print('Completed fetching posts.');
            return result;
        }
    };

    const proxiedProcessPosts = new Proxy(processPosts, handler);

     
    proxiedProcessPosts().then(posts => {
        print('Processed Posts:', posts);
    });

})();
