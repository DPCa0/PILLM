class DataProcessor {
    static #transform(item) {
        return { ...item, value: item.value ** 2 };
    }

    static async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data.map(this.#transform);
    }
}

const processAndLog = async (url) => {
    try {
        const data = await DataProcessor.fetchData(url);
        const processedData = data.filter(item => item.value > 10)
                                  .reduce((acc, item) => ({ ...acc, [item.id]: item.value }), {});
        console.table(processedData);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

const url = 'https://api.example.com/data';
processAndLog(url);
