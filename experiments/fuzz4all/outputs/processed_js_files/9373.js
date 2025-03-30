 

 
async function fetchData() {
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => resolve({ user: 'Alice', role: 'admin' }), 1000);
    });
    return data;
}

 
function* processData(data) {
    yield `User: ${data.user}`;
    yield `Role: ${data.role}`;
}

 
const handler = {
    get: function(target, property) {
        print(`Property '${property}' accessed`);
        return target[property];
    }
};

async function main() {
    const data = await fetchData();
    
    const proxyData = new Proxy(data, handler);
    print(`Accessing through Proxy: ${proxyData.user}, ${proxyData.role}`);
    
    const dataIterator = processData(proxyData);
    for (let info of dataIterator) {
        print(info);
    }
}

main();
