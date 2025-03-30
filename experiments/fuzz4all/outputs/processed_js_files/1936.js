 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({
                    json: () => Promise.resolve({ name: "Advanced JS", version: "ES2023", features: ["async/await", "destructuring", "generators"] })
                });
            } else {
                reject(new Error("404: Not Found"));
            }
        }, 1000);
    });
};

 
function* featureIterator(features) {
    for (const feature of features) {
        yield `Feature: ${feature}`;
    }
}

 
async function processData(url) {
    try {
        const response = await fetchData(url);
        const data = await response.json();
        
         
        const { name, version, features } = data;
        print(`Name: ${name}, Version: ${version}`);
        
         
        const iterator = featureIterator(features);
        let result = iterator.next();
        while (!result.done) {
            print(result.value);
            result = iterator.next();
        }
    } catch (error) {
        console.error(error.message);
    }
}

 
processData("https://api.example.com/data");
