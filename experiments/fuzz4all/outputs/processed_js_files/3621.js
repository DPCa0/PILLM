 

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

const handler = {
    get(target, prop) {
        if (prop === 'size') {
            return Reflect.get(target, prop) * 2;
        }
        return Reflect.get(target, prop);
    }
};

async function processData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        let dataSet = new Set(response.data);
        let proxySet = new Proxy(dataSet, handler);
        
        proxySet.add(6);
        proxySet.add(7);

        print(`Processed Data Set: ${Array.from(proxySet)}`);
        print(`Size of Data Set (proxy adjusted): ${proxySet.size}`);
        
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

processData();
