 

 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
function* dataProducer(dataArray) {
    for (let data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get(target, property) {
        print(`Property "${property}" has been accessed.`);
        return target[property];
    },
    set(target, property, value) {
        print(`Property "${property}" has been set to ${value}.`);
        target[property] = value;
        return true;
    }
};

 
function processData({ name, age, city }) {
    print(`Name: ${name}, Age: ${age}, City: ${city}`);
}

 
(async function main() {
     
    const url = 'https://jsonplaceholder.typicode.com/users';
    const users = await fetchData(url);

     
    const [firstUser] = users;
    processData(firstUser);

     
    const proxyUser = new Proxy(firstUser, handler);
    
     
    print(proxyUser.name);
    proxyUser.name = 'New Name';

     
    const userGenerator = dataProducer(users);
    
    for (let user of userGenerator) {
        print(`Generator produced: ${user.name}`);
        if (user.id >= 3) break;  
    }
})();
