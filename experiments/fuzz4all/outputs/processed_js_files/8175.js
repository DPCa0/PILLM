(async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const fetchData = async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    class DataProcessor {
        static #instance;
        
        static getInstance() {
            if (!DataProcessor.#instance) {
                DataProcessor.#instance = new DataProcessor();
            }
            return DataProcessor.#instance;
        }
        
        async process(url) {
            try {
                const data = await fetchData(url);
                const processed = data.map(item => ({
                    ...item,
                    timestamp: new Date().toISOString(),
                }));
                this.#log(processed);
            } catch (error) {
                console.error(`Error processing data: ${error.message}`);
            }
        }

        #log(data) {
            console.table(data);
        }
    }

    const debounce = (fn, delay) => {
        let timeout;
        return (...args) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    };

    const processDataDebounced = debounce(
        url => DataProcessor.getInstance().process(url),
        1000
    );

    const url = 'https://jsonplaceholder.typicode.com/posts';
    print('Fetching data...');
    await delay(2000);
    processDataDebounced(url);
})();
