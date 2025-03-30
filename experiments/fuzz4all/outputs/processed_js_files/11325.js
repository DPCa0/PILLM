 
class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

const processData = async (url) => {
    const fetcher = new DataFetcher(url);
    const data = await fetcher.fetchData();

    if (!data) {
        console.warn('No data received');
        return;
    }

    const { title, body } = data;
    return `Title: ${title}\nBody: ${body}`;
};

const main = async () => {
    try {
        const data = await processData('https://jsonplaceholder.typicode.com/posts/1');
        print(data || 'No data to display');
    } catch (error) {
        console.error('Error in main:', error);
    }
};

main();
