class AsyncDataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const handleData = async (url) => {
    const fetcher = new AsyncDataFetcher(url);
    let data = await fetcher.fetchData();

    if (data) {
        const { result: [{ name, age } = {}] = [] } = data;
        if (name && age) {
            print(`User Name: ${name}, Age: ${age}`);
        }
    }
};

const simulateAsyncOperation = (fn, delay = 1000) => new Promise((resolve) => setTimeout(() => {
    print('Performing asynchronous operation...');
    fn();
    resolve();
}, delay));

const processData = async (url) => {
    await simulateAsyncOperation(async () => {
        print('Starting data processing...');
        await handleData(url);
    });

    print('Data processing completed!');
};

 
processData('https://api.example.com/userData');
