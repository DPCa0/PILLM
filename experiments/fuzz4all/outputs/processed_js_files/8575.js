 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexOperations() {
     
    const person = { name: 'Alice', age: 30, job: 'Engineer' };
    const { name, ...rest } = person;
    print(`Name: ${name}`);
    print(`Rest of the info:`, rest);

     
    function format(strings, ...values) {
        return strings.reduce((result, str, i) => `${result}${str}<b>${values[i] || ''}</b>`, '');
    }
    print(format`Name: ${name}, Age: ${rest.age}`);

     
    async function* fetchData() {
        yield await delay(1000).then(() => 'Data from API 1');
        yield await delay(500).then(() => 'Data from API 2');
    }

     
    for await (const data of fetchData()) {
        print(`Fetched: ${data}`);
    }

     
    const set = new Set([1, 2, 2, 3, 4]);
    const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
    print(`Set has 2: ${set.has(2)}`);
    print(`Map size: ${map.size}`);

     
    const handler = {
        get: (target, prop) => prop in target ? target[prop] : 'Property does not exist',
    };
    const proxyPerson = new Proxy(person, handler);
    print(`Proxy access to job: ${proxyPerson.job}`);
    print(`Proxy access to non-existing property: ${proxyPerson.salary}`);
}

 
complexOperations();
