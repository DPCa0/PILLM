 

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [1, 2, 3, 4, 5];
            resolve(data);
        }, 1000);
    });
}

 
function* dataGenerator(data) {
    for (let item of data) {
        yield item * 2;  
    }
}

 
const dataHandler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Accessing ${prop}`);
            return target[prop];
        } else {
            console.warn(`Property ${prop} not found`);
            return undefined;
        }
    }
};

(async function main() {
     
    const data = await fetchData();
    print("Fetched Data:", data);

     
    const proxyData = new Proxy(data, dataHandler);

     
    const generator = dataGenerator(proxyData);
    for (let value of generator) {
        print("Processed Value:", value);
    }

     
    print(proxyData[0]);  
    print(proxyData[10]);  
})();
