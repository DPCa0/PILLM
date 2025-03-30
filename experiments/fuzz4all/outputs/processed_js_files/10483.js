class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator(array) {
    for (let item of array) {
        yield await new Promise(resolve => setTimeout(() => resolve(item), 1000));
    }
}

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

const dataHandler = new Proxy({}, {
    get: function(target, prop) {
        print(`Accessing property '${prop}'`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
});

(async () => {
    const deferred = new Deferred();

    setTimeout(() => {
        deferred.resolve("Deferred Resolved!");
    }, 3000);

    const generator = asyncGenerator([1, 2, 3, 4, 5]);

    for await (let value of generator) {
        print(value);
    }

    const jsonData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    dataHandler.todo = jsonData;

    print(dataHandler.todo);

    const message = await deferred.promise;
    print(message);

     
    print(dataHandler.todo?.title ?? 'No title available');
})();
