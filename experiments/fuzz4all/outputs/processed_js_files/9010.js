 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Hello, advanced JavaScript world!' }), 1000);
    });
}

 
function* messageGenerator() {
    yield 'Starting the generator...';
    yield 'Fetching data, please wait...';
    const data = yield;  
    yield `Data received: ${data}`;
    yield 'Generator complete.';
}

 
const handler = {
    get: function (target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(...arguments);
    },
};

async function run() {
    const messages = messageGenerator();
    print(messages.next().value);  

    print(messages.next().value);  
    const data = await fetchData();

    const messageWithProxy = new Proxy({ data: data.data }, handler);

    print(messages.next(messageWithProxy.data).value);  
    print(messages.next().value);  
}

run();
