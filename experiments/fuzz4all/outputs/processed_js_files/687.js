class AsyncDataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        try {
            const results = await Promise.all(this.data.map(async item => {
                const fetchedData = await this.fetchData(item);
                return this.transformData(fetchedData);
            }));
            this.logResults(results);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }

    async fetchData(item) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {  
                    resolve(`Fetched data for ${item}`);
                } else {
                    reject(`Failed to fetch data for ${item}`);
                }
            }, 100);
        });
    }

    transformData(data) {
        return data.toUpperCase();
    }

    logResults(results) {
        print('Processed Results:', results);
    }
}

 
const processor = new AsyncDataProcessor(['item1', 'item2', 'item3', 'item4']);
processor.processData();
