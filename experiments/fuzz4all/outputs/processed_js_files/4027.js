 
class DataFetcher {
    constructor() {
        this.cache = new Map();
    }

     
    async fetchData(url) {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        const response = await fetch(url);
        const data = await response.json();
        this.cache.set(url, data);
        return data;
    }
}

 
(async () => {
    const fetcher = new DataFetcher();

     
    const [userData, postData] = await Promise.all([
        fetcher.fetchData('https://jsonplaceholder.typicode.com/users/1'),
        fetcher.fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);

     
    const { name, email } = userData;
    const [{ title, body }] = postData;

     
    print(`User: ${name} (${email})`);
    print(`First Post: "${title}" - ${body}`);

     
    if (someCondition()) {
        const { exampleFunction } = await import('./exampleModule.js');
        exampleFunction();
    }

     
    function someCondition() {
        return false;  
    }
})();
