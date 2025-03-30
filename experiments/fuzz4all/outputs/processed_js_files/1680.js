 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        const response = await fetch(`${this.apiUrl}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    }
}

const fetchDataParallel = async (urls) => {
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    const data = await Promise.all(promises);
    return data;
};

(async () => {
    const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');

    try {
        const userData = await fetcher.fetchData('/users/1');
        const postIds = [1, 2, 3, 4, 5];
        
        const postsUrls = postIds.map(id => `https: 
        const postsData = await fetchDataParallel(postsUrls);

        const { name, email } = userData;
        print(`User: ${name}, Email: ${email}`);
        
        postsData.forEach(({ id, title, body }) => {
            print(`Post ${id} - Title: ${title}`);
            print(`Body: ${body}\n`);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
