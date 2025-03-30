 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: "Hello, world!", timestamp: new Date().toISOString() };
            resolve(data);
        }, 1000);
    });
}

 
const dataHandler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        if (prop in target) {
            return Reflect.get(target, prop);
        } else {
            console.warn(`Property "${prop}" does not exist`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
class DataProcessor {
    constructor(data) {
        this.data = new Proxy(data, dataHandler);
    }
    
    static processStatic(data) {
        print("Static processing:", data.message.toUpperCase());
    }

    processInstance() {
        print("Instance processing:", this.data.message.toLowerCase());
    }
}

 
(async () => {
    try {
        const url = 'https://api.example.com/data';
        const data = await fetchData(url);
        
         
        DataProcessor.processStatic(data);

         
        const processor = new DataProcessor(data);
        processor.processInstance();
        
         
        print(processor.data.timestamp);
        processor.data.newProperty = "New Value";
        print(processor.data.newProperty);
        
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
})();
