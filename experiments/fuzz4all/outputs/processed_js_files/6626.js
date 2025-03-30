 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data" });
            } else {
                reject(new Error("404 Not Found"));
            }
        }, 1000);
    });
};

 
async function getData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        print("Fetched Data:", response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting property ${property}`);
            return target[property];
        } else {
            console.warn(`Property ${property} does not exist`);
            return null;
        }
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const dataProxy = new Proxy({ a: 1, b: 2 }, handler);

 
print("Value of a:", dataProxy.a);
dataProxy.c = 3;
print("Value of c:", dataProxy.c);
print("Value of d (non-existent):", dataProxy.d);

 
getData();
