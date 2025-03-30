class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
}

function* dataGenerator(data) {
    for (let item of data) {
        yield item;
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const fetcher = new DataFetcher(url);
    
    try {
        const data = await fetcher.fetchData();
        const gen = dataGenerator(data);
        
        for (let post of gen) {
            const transformedData = {
                title: post.title.toUpperCase(),
                body: post.body.slice(0, 20) + '...',
            };
            
            print(JSON.stringify(transformedData, null, 2));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
