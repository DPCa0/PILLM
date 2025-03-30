class AsyncIterator {
    constructor(data) {
        this.data = data;
        this.index = 0;
    }

    async next() {
        if (this.index < this.data.length) {
            return { value: this.data[this.index++], done: false };
        } else {
            return { done: true };
        }
    }

    [Symbol.asyncIterator]() {
        return this;
    }
}

async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

(async () => {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/3"
    ];

    const iterator = new AsyncIterator(urls);

    for await (const data of iterator) {
        const jsonData = await fetchData([data]);
        for await (const item of jsonData) {
            print(`Title: ${item.title}`);
        }
    }
})();
