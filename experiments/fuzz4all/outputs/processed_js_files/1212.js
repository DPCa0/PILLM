 

 
function* dataGenerator() {
    yield fetchDataAsync('https://api.example.com/data1');
    yield fetchDataAsync('https://api.example.com/data2');
    yield fetchDataAsync('https://api.example.com/data3');
}

 
async function fetchDataAsync(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
const loggingHandler = {
    get(target, prop) {
        print(`Property '${prop}' accessed.`);
        return target[prop];
    }
};

 
async function main() {
     
    const generator = dataGenerator();
    const resultArray = [];

    for (let value of generator) {
        const data = await value;
        const proxyData = new Proxy(data, loggingHandler);
        resultArray.push(proxyData);
        print(proxyData);   
    }

     
    print('Final Results:', resultArray);
}

main().catch(console.error);
