(async function() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const fetchData = async () => {
        await delay(1000);  
        return { data: [1, 2, 3, 4, 5] };
    };

    class DataProcessor {
        #data;

        constructor(data) {
            this.#data = data;
        }

        *process() {
            for (let item of this.#data) {
                yield item * 2;
            }
        }

        async display() {
            for await (let result of this.asynchronousProcess()) {
                print(result);
            }
        }

        asynchronousProcess = async function*() {
            for (let item of this.process()) {
                await delay(500);  
                yield item;
            }
        }
    }

    try {
        const { data } = await fetchData();
        const processor = new DataProcessor(data);
        await processor.display();
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
