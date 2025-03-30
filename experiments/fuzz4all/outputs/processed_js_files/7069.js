class AsyncQueue {
    #tasks = [];
    #isRunning = false;

    enqueue(task) {
        this.#tasks.push(task);
        if (!this.#isRunning) {
            this.#run();
        }
    }

    async #run() {
        this.#isRunning = true;
        while (this.#tasks.length > 0) {
            const task = this.#tasks.shift();
            await task();
        }
        this.#isRunning = false;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
    print(`Fetching: ${url}`);
    await delay(1000);  
    print(`Fetched: ${url}`);
    return `Data from ${url}`;
};

(async () => {
    const queue = new AsyncQueue();

    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2',
        'https://api.example.com/data3'
    ];

    const tasks = urls.map(url => async () => {
        const data = await fetchData(url);
        print(`Processed: ${data}`);
    });

    tasks.forEach(task => queue.enqueue(task));
})();
