 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
class Observable {
    constructor(obj) {
        return new Proxy(obj, {
            get(target, prop) {
                print(`Getting ${prop}`);
                return Reflect.get(target, prop);
            },
            set(target, prop, value) {
                print(`Setting ${prop} to ${value}`);
                return Reflect.set(target, prop, value);
            }
        });
    }
}

async function* fetchSequence() {
    const urls = ['https://api.github.com', 'https://jsonplaceholder.typicode.com/posts'];
    for (const url of urls) {
        await delay(1000);
        yield fetch(url).then(res => res.json());
    }
}

(async () => {
    const observable = new Observable({ a: 1, b: 2 });
    
    print(`Value of a: ${observable.a}`);
    observable.a = 42;

    const sequence = fetchSequence();
    for await (const data of sequence) {
        print(`Fetched data: ${JSON.stringify(data, null, 2)}`);
    }
})();
