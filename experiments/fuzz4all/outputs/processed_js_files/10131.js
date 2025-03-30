 

 
const loggerHandler = {
    get(target, property) {
        print(`Getting property '${property}'`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value);
    }
};

const targetObject = { message: "Hello" };
const proxyObject = new Proxy(targetObject, loggerHandler);

 
async function* fetchData() {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    }
}

 
async function processData() {
    for await (const { title, body } of fetchData()) {
        print(`Title: ${title}`);
        print(`Body: ${body}`);
    }
}

 
async function run() {
    proxyObject.message = "Hello, world!";
    print(proxyObject.message);

    await processData();
}

run();
