class DataHandler {
    #data;
  
    constructor(data) {
        this.#data = data;
    }
  
    processData() {
        return this.#data.map((item, index) => ({
            index,
            value: item * 2,
            info: item > 50 ? 'large' : 'small'
        }));
    }
  
    async fetchData(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const jsonData = await response.json();
            this.#data = [...this.#data, ...jsonData];
        } catch (error) {
            console.error('Fetching error:', error);
        }
    }

    static async executeComplexLogic(apiUrl) {
        const initialData = [20, 45, 78, 30];
        const handler = new DataHandler(initialData);

        await handler.fetchData(apiUrl);
        const processedData = handler.processData();

        const result = processedData.reduce((acc, { value, info }) => {
            acc[info] = acc[info] || [];
            acc[info].push(value);
            return acc;
        }, {});

        print('Processed Data:', processedData);
        print('Grouped Result:', result);
    }
}

const apiURL = 'https://api.example.com/data';  
DataHandler.executeComplexLogic(apiURL);
