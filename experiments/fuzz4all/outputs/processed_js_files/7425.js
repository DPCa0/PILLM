 
async function* fetchDataSimulator() {
    const mockData = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
        { id: 3, value: 'baz' }
    ];
    for (const item of mockData) {
        await new Promise(res => setTimeout(res, 1000));  
        yield item;
    }
}

 
const loggingHandler = {
    get(target, prop) {
        print(`Accessing property '${prop}'`);
        return prop in target ? target[prop] : `Property '${prop}' not found`;
    }
};

 
const loggedObject = new Proxy({ message: 'Hello, Proxy!' }, loggingHandler);

 
function format(strings, ...values) {
    return strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');
}

 
(async function main() {
     
    for await (const data of fetchDataSimulator()) {
        print(`Fetched data: ${JSON.stringify(data)}`);
    }

     
    print(loggedObject.message);
    print(loggedObject.nonExistentProperty);

     
    const user = 'Alice';
    const action = 'logged in';
    print(format`User ${user} has ${action}.`);
})();
