class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchData(url) {
    const deferred = new Deferred();
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 5000);  

    fetch(url, { signal })
        .then(response => response.json())
        .then(data => deferred.resolve(data))
        .catch(err => deferred.reject(err));

    return deferred.promise;
}

function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const generator = dataGenerator(data);

        for (const post of generator) {
            print(`Title: ${post.title}`);
            print(`Body: ${post.body}`);
            print('-----------------------------------');
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
