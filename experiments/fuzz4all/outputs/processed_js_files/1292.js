 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({data: [1, 2, 3, 4, 5]}), 1000);
    });
}

 
function* processData(dataArray) {
    for (let item of dataArray) {
        yield item * 2;  
    }
}

 
const logHandler = {
    get: (target, property, receiver) => {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property, receiver);
    }
};

 
async function main() {
     
    const {data} = await fetchData();
    print('Fetched Data:', data);

     
    const proxyData = new Proxy(data, logHandler);

     
    const generator = processData(proxyData);

     
    for (let value of generator) {
        print('Processed Value:', value);
    }
}

 
main();
