 

 
async function fetchData(url) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data" });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
const _secret = Symbol("secret");

class DataHandler {
    constructor() {
        this[_secret] = "mySecret";
    }

    get secret() {
        return this[_secret];
    }

     
    static createProxy(target) {
        return new Proxy(target, {
            get(obj, prop) {
                print(`Accessing property: ${prop.toString()}`);
                return obj[prop];
            },
            set(obj, prop, value) {
                print(`Setting property: ${prop.toString()} to ${value}`);
                obj[prop] = value;
                return true;
            }
        });
    }
}

 
async function processData(url) {
    try {
        const result = await fetchData(url);
        print(`Fetched Data: ${result.data}`);
        
        const dataHandler = DataHandler.createProxy(new DataHandler());
        print(`Secret Data: ${dataHandler.secret}`);
        
        return result.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

 
processData("https://api.example.com/data");
processData("https://invalid-url.com");
