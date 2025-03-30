 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
function* dataGenerator(data) {
    for (let value of data) {
        yield value;
    }
}

 
const dataHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        } else {
            throw new Error(`Property '${prop}' not found`);
        }
    }
};

 
async function processData() {
    try {
         
        const response = await fetchData("https://api.example.com/data");
        const proxyData = new Proxy(response.data, dataHandler);

         
        const iterator = dataGenerator(proxyData);

        for (let value of iterator) {
            print(`Processing value: ${value}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

 
processData();
