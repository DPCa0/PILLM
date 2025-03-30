 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
}

 
function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = createCounter();

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property ${prop}`);
        return target[prop];
    }
};

 
(async () => {
    try {
        const url = "https://api.example.com/data";
        const response = await fetchData(url);
        
        const proxyData = new Proxy(response, handler);
        
        print("Data fetched:", proxyData.data);

        const currentCount = counter();
        print("Counter:", currentCount);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
