 
async function* fetchDataSimulator() {
    const simulatedData = ['Data 1', 'Data 2', 'Data 3'];
    for (const data of simulatedData) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield data;
    }
}

 
const targetObject = { message: "Hello, World!" };
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed.`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Property '${prop}' set to '${value}'.`);
        target[prop] = value;
        return true;
    }
};
const proxy = new Proxy(targetObject, handler);

 
function customTag(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i - 1] ? `[${values[i - 1].toUpperCase()}]` : '';
        return result + value + string;
    });
}

async function main() {
     
    print(proxy.message);  
    proxy.message = "Hello, Proxy!";  

     
    const name = 'world';
    print(customTag`Hello, ${name}! How's your day?`);

    // Use the async generator
    print('Fetching data...');
    for await (const data of fetchDataSimulator()) {
        print('Fetched:', data);
    }
}

main();
