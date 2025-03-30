 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetching data failed:', error);
            throw error;
        }
    }
}

const processData = async (dataFetcher) => {
    try {
        let data = await dataFetcher.fetchData();
        let { results: [{ name: { first, last } }] } = data;
        print(`Fetched Data: ${first} ${last}`);
    } catch (error) {
        console.error('Processing data failed:', error);
    }
};

const transformData = (data) => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!data) reject('No data to transform');
            let transformed = data.map(item => ({ ...item, timestamp: new Date() }));
            resolve(transformed);
        }, 1000);
    });
    return promise;
};

const main = async () => {
    const dataFetcher = new DataFetcher('https://randomuser.me/api/?results=1');
    await processData(dataFetcher);

    let dummyData = [{ id: 1, value: 'A' }, { id: 2, value: 'B' }];
    try {
        let transformedData = await transformData(dummyData);
        print('Transformed Data:', transformedData);
    } catch (error) {
        console.error('Data transformation failed:', error);
    }
};

main();
