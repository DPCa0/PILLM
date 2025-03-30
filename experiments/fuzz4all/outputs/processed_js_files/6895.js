 

 
const moduleExample = (() => {
    const privateVariable = "I am private";

    return {
        getPrivateVariable() {
            return privateVariable;
        }
    };
})();

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
    });
};

 
async function asyncFunction() {
    try {
        const { data } = await fetchData();
        print(`Fetched data: ${data}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const targetObject = { message: "Hello, Proxy!" };
const proxyHandler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};
const proxy = new Proxy(targetObject, proxyHandler);

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const [id1, id2, id3] = idGenerator();

 
print(moduleExample.getPrivateVariable());
asyncFunction();
print(proxy.message);
print(`Generated IDs: ${id1}, ${id2}, ${id3}`);
