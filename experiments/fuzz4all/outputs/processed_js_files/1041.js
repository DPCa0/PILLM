 
class ObservableArray {
    constructor() {
        this.data = [];
        return new Proxy(this, {
            get(target, property) {
                if (property === 'push') {
                    return function (...args) {
                        const result = target.data.push(...args);
                        print(`New element(s) added: ${args}`);
                        return result;
                    };
                }
                return target[property];
            }
        });
    }
}

async function* fetchDataAsyncGenerator(urls) {
    for (const url of urls) {
        print(`Fetching: ${url}`);
        const response = await fetch(url);
        yield response.json();
    }
}

(async () => {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    const observableArray = new ObservableArray();

    for await (const data of fetchDataAsyncGenerator(urls)) {
        observableArray.push(data);
    }

    print('Final array:', observableArray.data);
})();
