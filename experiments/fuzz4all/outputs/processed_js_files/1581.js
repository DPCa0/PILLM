 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            const data = { url, data: "Sample Data" };
            resolve(data);
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const result = await fetchData(url);
        print(`Data fetched from ${url}:`, result.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Property '${prop}' set to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

 
const targetObject = {
    name: "ProxyTarget",
    version: 1.0
};

 
const proxy = new Proxy(targetObject, handler);

 
print("Initial Name:", proxy.name);
proxy.version = 2.0;
print("Updated Version:", proxy.version);

 
print("Starting async operations...");
getData("http://example.com/api/data").then(() => {
    proxy.name = "UpdatedProxyTarget";
    print("Final Name:", proxy.name);
});
