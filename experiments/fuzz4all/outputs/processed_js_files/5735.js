 

 
function fetchData(url) {
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

 
async function processData(url) {
    try {
        const response = await fetchData(url);
        const { data } = response;  
        return data.map(num => num * 2);  
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
async function execute() {
    const originalData = await processData("https://api.example.com/data");
    const clonedData = [...originalData];  
    clonedData.push(12);  

    const handler = {
        get: (target, prop) => {
            if (prop in target) {
                return target[prop];
            } else {
                return "Property not found";
            }
        }
    };

     
    const proxiedData = new Proxy(clonedData, handler);
    
    print("Original Data:", originalData);
    print("Cloned and Modified Data:", clonedData);
    print("Access through Proxy, valid:", proxiedData[2]);
    print("Access through Proxy, invalid:", proxiedData[10]);
}

 
execute();
