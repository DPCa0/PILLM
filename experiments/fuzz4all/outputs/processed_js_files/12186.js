 

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ id: 1, name: "John Doe", age: 30 }), 1000);
    });
}

 
function* processDataGen(data) {
    let processedData = { ...data, fetchedAt: new Date() };
    yield processedData;
    processedData = { ...processedData, active: true };
    yield processedData;
}

 
const handler = {
    set(target, prop, value) {
        print(`Property ${prop} set to ${value}`);
        target[prop] = value;
        return true;
    }
};

(async function main() {
    try {
        const rawData = await fetchData();
        
        print("Raw Data:", rawData);

         
        const observedData = new Proxy(rawData, handler);
        
         
        const processor = processDataGen(observedData);
        
        let result = processor.next();
        while (!result.done) {
            print("Processed Data:", result.value);
            result = processor.next();
        }
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
