 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "validURL") {
            resolve({ data: "Sample data from " + url });
        } else {
            reject("Invalid URL");
        }
    }, 1000);
});

 
async function retrieveData(url) {
    try {
        const response = await fetchData(url);
        print("Fetched:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

 
const targetObject = { message: "Hello, world!", count: 0 };

 
const handler = {
    get: (obj, prop) => {
        if (prop === 'message') {
            return obj[prop].toUpperCase();
        }
        return obj[prop];
    },
    set: (obj, prop, value) => {
        if (prop === 'count') {
            print(`Setting count to ${value}`);
        }
        obj[prop] = value;
        return true;
    }
};

const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.message = "Hello!";
print(proxyObject.message);
proxyObject.count = 42;

retrieveData("validURL");
retrieveData("invalidURL");
