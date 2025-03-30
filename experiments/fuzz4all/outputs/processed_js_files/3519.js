 

class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async fetchUrl(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        return await response.json();
    }

    async *fetchAll() {
        for (let url of this.urls) {
            try {
                const data = await this.fetchUrl(url);
                yield { url, status: 'success', data };
            } catch (error) {
                yield { url, status: 'error', error: error.message };
            }
        }
    }
}

function observeData(fetcher) {
    const observer = new Proxy(fetcher, {
        get(target, prop) {
            if (prop === 'fetchAll') {
                return async function* (...args) {
                    print("Started fetching data...");
                    for await (let result of target.fetchAll(...args)) {
                        print(`Fetched from: ${result.url}, Status: ${result.status}`);
                        yield result;
                    }
                    print("Finished fetching data.");
                };
            }
            return target[prop];
        }
    });
    return observer;
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2',
        'https://invalid-url',
    ];
    const fetcher = observeData(new DataFetcher(urls));

    for await (let result of fetcher.fetchAll()) {
        if (result.status === 'success') {
            print('Data:', result.data);
        } else {
            console.error('Error:', result.error);
        }
    }
})();
