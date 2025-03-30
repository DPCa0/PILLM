 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data from API" });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
}

 
const handler = {
    set(target, prop, value) {
        if (prop === "url" && typeof value !== "string") {
            throw new Error("URL must be a string");
        }
        target[prop] = value;
        return true;
    }
};

const apiConfig = new Proxy({ url: "" }, handler);

 
function* dataFlow() {
    try {
        apiConfig.url = "https://api.example.com/data";
        const response = yield fetchData(apiConfig.url);
        print("Fetched Data:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

 
async function runGenerator(gen) {
    const generator = gen();
    function handle(result) {
        if (result.done) return Promise.resolve(result.value);
        return Promise.resolve(result.value).then(
            res => handle(generator.next(res)),
            err => handle(generator.throw(err))
        );
    }
    return handle(generator.next());
}

 
async function executeDataFlow() {
    await runGenerator(dataFlow);
}

 
executeDataFlow();
