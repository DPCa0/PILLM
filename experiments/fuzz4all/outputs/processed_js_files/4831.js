class DataFetcher {
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
            console.error('Fetching error:', error);
            throw error;
        }
    }
}

const dataProcessor = {
    process(data) {
        const processed = data.map(item => ({
            ...item,
            fullName: `${item.firstName} ${item.lastName}`,
            isAdult: item.age >= 18
        }));
        return processed;
    }
};

async function main() {
    const fetcher = new DataFetcher('https://api.example.com/users');

    try {
        const data = await fetcher.fetchData();
        const processedData = dataProcessor.process(data);

        const adults = processedData.filter(user => user.isAdult);
        print('Adult Users:', adults);

        const sortedByName = [...processedData].sort((a, b) => a.fullName.localeCompare(b.fullName));
        print('Sorted Users by Name:', sortedByName);

    } catch (error) {
        console.error('Error in main execution:', error);
    }
}

main();
