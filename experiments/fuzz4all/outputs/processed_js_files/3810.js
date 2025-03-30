 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: { id: 1, name: "John Doe", age: 30 } });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
function* processData(data) {
    const { id, name, age } = data;
    yield `ID: ${id}`;
    yield `Name: ${name}`;
    yield `Age: ${age}`;
}

 
const dataHandler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

 
async function main() {
    try {
         
        const response = await fetchData("https://api.example.com/data");
        
         
        const proxyData = new Proxy(response.data, dataHandler);
        
         
        const processor = processData(proxyData);
        for (let value of processor) {
            print(value);
        }
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}

 
main();
