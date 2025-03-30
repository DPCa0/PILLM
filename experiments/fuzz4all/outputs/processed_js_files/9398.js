 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data fetched!');
        }, 1000);
    });
}

 
async function asyncOperation() {
    print('Fetching data...');
    const data = await fetchData();
    print(data);
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const handler = {
    get: function(target, property) {
        print(`Property '${property}' was accessed.`);
        return property in target ? target[property] : `Property '${property}' not found`;
    }
};

const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
asyncOperation();

 
const gen = idGenerator();
print(`Generated ID: ${gen.next().value}`);
print(`Generated ID: ${gen.next().value}`);

 
print(user.name);
print(user.address);
