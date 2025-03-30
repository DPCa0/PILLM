class DataService {
    constructor() {
        this.dataCache = new Map();
    }

    async fetchData(url) {
        if (this.dataCache.has(url)) {
            print('Cache Hit');
            return Promise.resolve(this.dataCache.get(url));
        }

        print('Fetching:', url);
        const response = await fetch(url);
        const data = await response.json();
        this.dataCache.set(url, data);
        return data;
    }
}

const pipeAsyncFunctions = (...fns) => x => fns.reduce((v, f) => v.then(f), Promise.resolve(x));

const transformData = data => data.map(item => ({ ...item, active: true }));
const logData = data => (print(data), data);

const processData = pipeAsyncFunctions(
    url => new DataService().fetchData(url),
    transformData,
    logData
);

const getAsyncData = async () => {
    try {
        const finalData = await processData('https://jsonplaceholder.typicode.com/users');
        print('Processed Data:', finalData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getAsyncData();
