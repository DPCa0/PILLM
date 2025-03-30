class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

 
const handler = {
    set(target, property, value) {
        if (target[property] !== value) {
            print(`Property ${property} changed to ${value}`);
            target.deferred.resolve(value);
            target.deferred = new Deferred();  
        }
        target[property] = value;
        return true;
    }
};

function createReactive(obj) {
    obj.deferred = new Deferred();
    return new Proxy(obj, handler);
}

 
async function* fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
}

(async () => {
    const reactiveObj = createReactive({ data: null });

    (async function listenForChanges() {
        while (true) {
            const newValue = await reactiveObj.deferred.promise;
            print('Reactively fetched new data:', newValue);
        }
    })();

     
    const dataIterator = fetchData('https://jsonplaceholder.typicode.com/todos/1');
    for await (const data of dataIterator) {
        reactiveObj.data = data;
    }
})();
