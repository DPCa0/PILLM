 

 
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

 
function* dataGenerator(dataArray) {
    for (let data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
let dataObject = {
    name: '',
    age: 0,
};

 
const proxyData = new Proxy(dataObject, handler);

 
async function main() {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const users = await fetchData(url);
        const userGen = dataGenerator(users);

        for (let user of userGen) {
            proxyData.name = user.name;
            proxyData.age = user.age || 'N/A';  

            print(`Name: ${proxyData.name}, Age: ${proxyData.age}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
