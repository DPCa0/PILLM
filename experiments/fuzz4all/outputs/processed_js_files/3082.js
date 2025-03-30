 

 
const handler = {
    get(target, property) {
        return property in target ? target[property] : `Property ${property} does not exist`;
    }
};

const targetObject = {
    firstName: "Alice",
    lastName: "Smith"
};

const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Some fetched data" });
        }, 1000);
    });
}

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

 
(async () => {
    print(proxy.firstName);  
    print(proxy.age);        

     
    const result = await fetchData();
    print(`Fetched: ${result.data}`);

     
    print(`Generated ID: ${gen.next().value}`);
    print(`Generated ID: ${gen.next().value}`);
    print(`Generated ID: ${gen.next().value}`);
})();
