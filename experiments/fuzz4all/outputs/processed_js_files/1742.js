class DataManager {
    #data = [];

    constructor(...initialData) {
        this.#data.push(...initialData);
    }

    *[Symbol.iterator]() {
        for (const item of this.#data) {
            yield item;
        }
    }

    async processData(callback) {
        const results = await Promise.allSettled(
            this.#data.map(async (item, index) => {
                const result = await callback(item);
                return { index, result };
            })
        );
        return results.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
    }

    get filteredData() {
        return this.#data.filter(item => item != null);
    }

    async #fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching data from ${url}`);
        const data = await response.json();
        this.#data.push(...data);
    }

    static async createWithFetchedData(url) {
        const instance = new DataManager();
        await instance.#fetchData(url);
        return instance;
    }
}

 
 

(async () => {
    const manager = await DataManager.createWithFetchedData('https://api.example.com/data');
    for (const item of manager) {
        print(item);
    }

    const processed = await manager.processData(async item => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return item * 2;
    });

    print('Processed data:', processed);
    print('Filtered data:', manager.filteredData);
})();
