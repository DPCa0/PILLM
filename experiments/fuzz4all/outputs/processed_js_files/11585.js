 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data from API" });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property '${prop}' does not exist.`);
            return undefined;
        }
    },
    set: function(target, prop, value) {
        print(`Setting '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

const dataHandler = new Proxy({}, handler);

 
async function fetchAndProcessData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        dataHandler.fetchedData = response.data;
        print(`Fetched Data: ${dataHandler.fetchedData}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

     
    print(dataHandler.nonExistingProperty);
}

 
const startApp = () => {
    print(`Starting Application...`);
    fetchAndProcessData();
};

startApp();
