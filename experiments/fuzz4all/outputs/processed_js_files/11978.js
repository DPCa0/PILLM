 

const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({ data: [1, 2, 3, 4, 5] });
        } else {
            reject("Invalid URL");
        }
    }, 1000);
});

async function processData(url) {
    try {
        const response = await fetchData(url);
        print("Data fetched:", response.data);

        const proxyHandler = {
            get: (obj, prop) => {
                return prop in obj ? obj[prop] : "Property not available";
            }
        };

        const proxiedData = new Proxy(response.data, proxyHandler);
        for (const value of generateProcessedData(proxiedData)) {
            print(value);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function* generateProcessedData(data) {
    for (let i = 0; i < data.length; i++) {
        yield `Processed Value: ${data[i] * 2}`;
    }
}

processData("https://api.example.com/data");
