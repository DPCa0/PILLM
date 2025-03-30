 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data" });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
}

 
function* dataGenerator() {
    yield "https://api.example.com/data";
    yield "https://api.example.com/other-data";
}

 
async function processData(gen) {
    for (let url of gen) {
        try {
            const result = await fetchData(url);
            print(`Fetched from ${url}:`, result);
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
        }
    }
}

 
const dataHandler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

const sampleData = new Proxy({ name: "John", age: 30 }, dataHandler);

 
const urls = dataGenerator();
processData(urls);

 
print(`Name: ${sampleData.name}`);
print(`Age: ${sampleData.age}`);
