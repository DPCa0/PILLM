 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: "Fetched data from " + url };
            resolve(data);
        }, 1000);
    });
}

 
async function complexFeatureDemo() {
    const urls = [
        "https://api.example.com/data1",
        "https://api.example.com/data2",
        "https://api.example.com/data3"
    ];

    try {
         
        const dataPromises = urls.map(url => fetchData(url));
        const results = await Promise.all(dataPromises);

         
        const [first, ...rest] = results;
        print("First result:", first);

         
        for (const { message } of rest) {
            print(`Other result: ${message}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : "Property not found!";
    }
};

const dynamicObject = new Proxy({ existing: "I exist" }, handler);
print(dynamicObject.existing);  
print(dynamicObject.nonExisting);  

 
complexFeatureDemo();
