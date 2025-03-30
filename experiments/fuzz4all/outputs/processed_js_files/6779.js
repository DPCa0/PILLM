 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "validURL") {
                resolve({ data: "Important data from " + url });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
};

 
function* dataFetcher() {
    try {
        yield fetchData("validURL");
        yield fetchData("anotherValidURL");
    } catch (error) {
        console.error("Error in fetching data:", error);
    }
}

 
async function processData() {
    const generator = dataFetcher();

    for (let promise of generator) {
        try {
            const result = await promise;
            print("Fetched:", result);
        } catch (error) {
            console.error("Error in processData:", error);
        }
    }
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' accessed.`);
        return target[prop];
    }
};

const data = { message: "Hello Proxy", status: "active" };
const proxyData = new Proxy(data, handler);

 
print(proxyData.message);
print(proxyData.status);

 
processData();
