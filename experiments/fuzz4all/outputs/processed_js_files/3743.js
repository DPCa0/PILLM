 
const watch = (obj, onGet, onSet) => new Proxy(obj, {
    get(target, prop) {
        onGet(prop, target[prop]);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        onSet(prop, value);
        return Reflect.set(target, prop, value);
    }
});

 
async function* fetchData(url, chunkSize = 5) {
    let offset = 0;
    while (true) {
        const response = await fetch(`${url}?offset=${offset}&limit=${chunkSize}`);
        const data = await response.json();
        if (!data.length) break;
        yield data;
        offset += chunkSize;
    }
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

Promise.allSettled(urls.map(url => (async () => {
    for await (const chunk of fetchData(url)) {
        print(chunk);
    }
})()))
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                print(`Completed fetching from: ${urls[index]}`);
            } else {
                console.error(`Error fetching from: ${urls[index]}`, result.reason);
            }
        });
    });

 
const createMessage = (name, count) => `Hello ${name}, you have ${count} new messages!`;

 
const user = watch(
    { name: 'Alice', age: 25 },
    (prop, value) => console.log(`Getting ${prop}: ${value}`),
    (prop, value) => console.log(`Setting ${prop} to ${value}`)
);

user.name = 'Bob';
print(createMessage(user.name, 3));
