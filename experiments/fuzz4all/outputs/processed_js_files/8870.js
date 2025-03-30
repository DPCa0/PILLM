class DataService {
    constructor(url) {
        this.url = url;
    }

    fetchData() {
        return fetch(this.url)
            .then(response => response.json())
            .catch(err => console.error('Fetch error:', err));
    }

    *processData(data) {
        for (const item of data) {
            yield item.value * 2;
        }
    }
}

async function main() {
    const url = 'https://api.example.com/data';
    const dataService = new DataService(url);

    const data = await dataService.fetchData();
    if (data) {
        const processedData = dataService.processData(data);

        const transformedData = Array.from(processedData, value => value + 5);
        print('Transformed Data:', transformedData);

        const [first, ...rest] = transformedData;
        print('First:', first, 'Rest:', rest);

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve('Asynchronous Task Complete'), 1000);
        });

        const result = await promise;
        print(result);
    }
}

main().catch(console.error);
