 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data" });
            } else {
                reject("404: Not Found");
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const response = await fetchData(url);
        print("Data fetched successfully:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting value of ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting value of ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const targetObject = { name: "JavaScript" };
const proxy = new Proxy(targetObject, handler);

 
async function main() {
    print("Starting program...");

     
    await getData("https://api.example.com/data");
    
     
    const idGen = idGenerator();
    print("Generated ID 1:", idGen.next().value);
    print("Generated ID 2:", idGen.next().value);

     
    print("Original name:", proxy.name);
    proxy.name = "ECMAScript";

    print("Program finished!");
}

main();
