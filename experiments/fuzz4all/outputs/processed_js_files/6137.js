 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Hello, world!" });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
function* asyncGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url).catch(err => err.message);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    }
};

const dataObj = new Proxy({ message: "Proxy Active" }, handler);

async function processUrls(urls) {
    const gen = asyncGenerator(urls);

    for await (const result of gen) {
        if (typeof result === "object") {
            print(dataObj.message + ": " + result.data);
        } else {
            console.error(dataObj.message + ": " + result);
        }
    }
}

const urls = [
    "https://api.example.com/data",
    "https://api.example.com/invalid"
];

processUrls(urls);
