 
class DataProcessor {
    static async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    static processData({ id, name, ...rest }) {
        print(`Processing User: ${name} with ID: ${id}`);
        print('Additional Info:', rest);
    }

    constructor(data) {
        this.data = data;
    }

    filterData(predicate) {
        return this.data.filter(predicate);
    }

    displayData() {
        this.data.forEach(({ id, name }) => {
            print(`User: ${name}, ID: ${id}`);
        });
    }
}

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const rawData = await DataProcessor.fetchData(url);

        const processor = new DataProcessor(rawData);
        processor.displayData();

        print('\nFiltered Data:');
        const filteredData = processor.filterData(({ id }) => id % 2 === 0);
        filteredData.forEach(DataProcessor.processData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
